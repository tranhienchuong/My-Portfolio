import assert from "node:assert/strict"
import test from "node:test"

test("the Vercel API entrypoint loads under Node's strip-only TypeScript runtime", async () => {
  const { default: handler } = await import("../api/ai-assistant.ts")
  assert.equal(typeof handler.fetch, "function")

  const response = await handler.fetch(
    new Request("https://portfolio.example/api/ai-assistant", { method: "GET" }),
  )

  assert.equal(response.status, 405)
  assert.match(response.headers.get("content-type"), /^application\/json/)
  assert.equal((await response.json()).code, "method_not_allowed")
})
