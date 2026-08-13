import type { IncomingMessage, ServerResponse } from "node:http"

import { buildPortfolioAssistantPrompt } from "./portfolio-assistant-prompt.ts"

type ConversationMessage = {
  role: "user" | "assistant"
  content: string
}

type AiAssistantConfig = {
  apiKey?: string
  apiBase?: string
  model?: string
}

type DeepSeekResponse = {
  choices?: Array<{
    message?: {
      content?: string | null
    }
  }>
}

class RequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
  ) {
    super(message)
  }
}

const MAX_BODY_BYTES = 32_000
const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 800

function sendJson(
  response: ServerResponse,
  status: number,
  payload: Record<string, unknown>,
) {
  response.statusCode = status
  response.setHeader("Content-Type", "application/json; charset=utf-8")
  response.setHeader("Cache-Control", "no-store")
  response.end(JSON.stringify(payload))
}

async function readJsonBody(request: IncomingMessage) {
  const chunks: Buffer[] = []
  let totalBytes = 0

  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    totalBytes += buffer.length

    if (totalBytes > MAX_BODY_BYTES) {
      throw new RequestError(
        "That message is too large. Please ask a shorter question.",
        413,
        "request_too_large",
      )
    }

    chunks.push(buffer)
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown
  } catch {
    throw new RequestError("The request body must be valid JSON.", 400, "invalid_json")
  }
}

function parseMessages(body: unknown): ConversationMessage[] {
  if (!body || typeof body !== "object" || !("messages" in body)) {
    throw new RequestError("A messages array is required.", 400, "invalid_messages")
  }

  const messages = (body as { messages?: unknown }).messages

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    throw new RequestError(
      `Send between 1 and ${MAX_MESSAGES} recent messages.`,
      400,
      "invalid_messages",
    )
  }

  return messages.map((message) => {
    if (!message || typeof message !== "object") {
      throw new RequestError("Each message must be an object.", 400, "invalid_message")
    }

    const { role, content } = message as { role?: unknown; content?: unknown }
    const normalizedContent = typeof content === "string" ? content.trim() : ""

    if (
      (role !== "user" && role !== "assistant") ||
      !normalizedContent ||
      normalizedContent.length > MAX_MESSAGE_LENGTH
    ) {
      throw new RequestError(
        `Messages need a valid role and no more than ${MAX_MESSAGE_LENGTH} characters.`,
        400,
        "invalid_message",
      )
    }

    return { role, content: normalizedContent }
  })
}

async function askDeepSeek(messages: ConversationMessage[], config: AiAssistantConfig) {
  if (!config.apiKey) {
    throw new RequestError(
      "Ask My AI is not connected yet. Add DEEPSEEK_API_KEY on the server, then try again.",
      503,
      "assistant_not_configured",
    )
  }

  const apiBase = (config.apiBase ?? "https://api.deepseek.com").replace(/\/$/, "")
  const model = config.model ?? "deepseek-v4-flash"
  const requestController = new AbortController()
  const timeout = setTimeout(() => requestController.abort(), 30_000)

  try {
    const upstreamResponse = await fetch(`${apiBase}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: buildPortfolioAssistantPrompt() },
          ...messages,
        ],
        thinking: { type: "disabled" },
        max_tokens: 520,
        stream: false,
      }),
      signal: requestController.signal,
    })

    if (!upstreamResponse.ok) {
      throw new RequestError(
        "DeepSeek could not answer just now. Please try again in a moment.",
        502,
        "upstream_error",
      )
    }

    const payload = (await upstreamResponse.json()) as DeepSeekResponse
    const answer = payload.choices?.[0]?.message?.content?.trim()

    if (!answer) {
      throw new RequestError(
        "DeepSeek returned an empty answer. Please try another question.",
        502,
        "empty_response",
      )
    }

    return { answer, model }
  } catch (error) {
    if (error instanceof RequestError) throw error

    if (error instanceof Error && error.name === "AbortError") {
      throw new RequestError(
        "The answer took too long. Please try a shorter question.",
        504,
        "upstream_timeout",
      )
    }

    throw new RequestError(
      "Ask My AI could not reach DeepSeek. Please try again shortly.",
      502,
      "upstream_unavailable",
    )
  } finally {
    clearTimeout(timeout)
  }
}

/**
 * Deep module for the assistant's HTTP seam. Vite and production functions use
 * the same interface while validation, prompt construction, model calls, and
 * safe error responses stay local to this implementation.
 */
export function createAiAssistantHttpHandler(config: AiAssistantConfig) {
  return async (request: IncomingMessage, response: ServerResponse) => {
    if (request.method !== "POST") {
      response.setHeader("Allow", "POST")
      sendJson(response, 405, {
        code: "method_not_allowed",
        message: "Use POST to talk with Ask My AI.",
      })
      return
    }

    try {
      const body = await readJsonBody(request)
      const messages = parseMessages(body)
      const result = await askDeepSeek(messages, config)

      sendJson(response, 200, {
        message: result.answer,
        model: result.model,
      })
    } catch (error) {
      if (error instanceof RequestError) {
        sendJson(response, error.status, { code: error.code, message: error.message })
        return
      }

      sendJson(response, 500, {
        code: "assistant_error",
        message: "Ask My AI hit an unexpected error. Please try again.",
      })
    }
  }
}
