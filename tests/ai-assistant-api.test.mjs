import assert from "node:assert/strict"
import test from "node:test"

test("the Vercel API entrypoint loads under Node's strip-only TypeScript runtime", async () => {
  const { default: handler } = await import("../api/ai-assistant.ts")
  const headers = new Map()
  let body = ""
  const response = {
    statusCode: 200,
    setHeader(name, value) {
      headers.set(name.toLowerCase(), String(value))
    },
    end(chunk = "") {
      body += String(chunk)
    },
  }

  await handler({ method: "GET" }, response)

  assert.equal(response.statusCode, 405)
  assert.match(headers.get("content-type"), /^application\/json/)
  assert.equal(JSON.parse(body).code, "method_not_allowed")
})
