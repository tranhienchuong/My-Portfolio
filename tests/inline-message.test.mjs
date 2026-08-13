import assert from "node:assert/strict"
import test from "node:test"

import { parseInlineMessage } from "../src/components/ai-assistant/inline-message.ts"

test("contact links do not absorb a closing parenthesis", () => {
  const message = [
    "Gmail: tranchuong.work@gmail.com (mailto:tranchuong.work@gmail.com)",
    "Phone: 0815355874 (tel:+84815355874)",
    "Facebook: tran.chuongg.5 (https://www.facebook.com/tran.chuongg.5/)",
    "GitHub: tranhienchuong (https://github.com/tranhienchuong)",
  ].join("\n")

  const links = parseInlineMessage(message).filter((segment) => segment.kind === "link")

  assert.deepEqual(
    links.map(({ href }) => href),
    [
      "mailto:tranchuong.work@gmail.com",
      "tel:+84815355874",
      "https://www.facebook.com/tran.chuongg.5/",
      "https://github.com/tranhienchuong",
    ],
  )
  assert.equal(
    parseInlineMessage(message)
      .filter((segment) => segment.kind === "text")
      .map(({ text }) => text)
      .join("")
      .match(/\)/g)?.length,
    4,
  )
})

test("URL punctuation is detached without breaking balanced URL parentheses", () => {
  const segments = parseInlineMessage(
    "See https://en.wikipedia.org/wiki/Function_(mathematics)). Next.",
  )
  const link = segments.find((segment) => segment.kind === "link")
  const surroundingText = segments
    .filter((segment) => segment.kind === "text")
    .map(({ text }) => text)
    .join("")

  assert.equal(link?.href, "https://en.wikipedia.org/wiki/Function_(mathematics)")
  assert.equal(surroundingText, "See ). Next.")
})

test("markdown contact links remain unchanged", () => {
  const segments = parseInlineMessage(
    "[Facebook](https://www.facebook.com/tran.chuongg.5/) and [email](mailto:tranchuong.work@gmail.com)",
  )
  const links = segments.filter((segment) => segment.kind === "link")

  assert.deepEqual(links, [
    {
      kind: "link",
      text: "Facebook",
      href: "https://www.facebook.com/tran.chuongg.5/",
    },
    {
      kind: "link",
      text: "email",
      href: "mailto:tranchuong.work@gmail.com",
    },
  ])
})
