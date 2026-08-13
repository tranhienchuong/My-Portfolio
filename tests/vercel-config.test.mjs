import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

test("the Vercel function bundle includes every runtime module outside api", async () => {
  const config = JSON.parse(await readFile(new URL("../vercel.json", import.meta.url), "utf8"))
  const includeFiles = config.functions?.["api/ai-assistant.ts"]?.includeFiles

  assert.equal(includeFiles, "{server/**,src/portfolio/content.ts}")
})
