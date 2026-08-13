import assert from "node:assert/strict"
import test from "node:test"

import { readAssistantMessage } from "../src/components/ai-assistant/assistant-response.ts"

test("a non-JSON platform error becomes a visitor-friendly message", async () => {
  const response = new Response("A server error has occurred", {
    status: 500,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })

  await assert.rejects(
    () => readAssistantMessage(response),
    (error) => {
      assert.equal(
        error.message,
        "Ask My AI is taking a quick break. Please try again in a moment.",
      )
      assert.doesNotMatch(error.message, /Unexpected token|JSON/i)
      return true
    },
  )
})
