type AssistantResponse = {
  message?: string
}

const FALLBACK_MESSAGE = "Ask My AI is taking a quick break. Please try again in a moment."

export async function readAssistantMessage(response: Response) {
  const rawBody = await response.text()
  let payload: AssistantResponse | undefined

  try {
    const parsed = JSON.parse(rawBody) as unknown
    if (parsed && typeof parsed === "object") {
      payload = parsed as AssistantResponse
    }
  } catch {
    payload = undefined
  }

  const message = typeof payload?.message === "string" ? payload.message.trim() : ""

  if (!response.ok || !message) {
    throw new Error(message || FALLBACK_MESSAGE)
  }

  return message
}
