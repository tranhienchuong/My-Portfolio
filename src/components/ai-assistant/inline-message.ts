export type InlineMessageSegment =
  | { kind: "text"; text: string }
  | { kind: "strong"; text: string }
  | { kind: "link"; text: string; href: string }

const INLINE_TOKEN_PATTERN =
  /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:(?:https?):\/\/|mailto:|tel:)[^)]+\)|(?:(?:https?):\/\/|mailto:|tel:)[^\s]+)/g

const ALWAYS_TRAILING_PUNCTUATION = new Set([".", ",", "!", "?", ";", ":"])
const CLOSING_PAIRS = {
  ")": "(",
  "]": "[",
  "}": "{",
} as const

function countCharacter(value: string, character: string) {
  return [...value].filter((candidate) => candidate === character).length
}

function detachTrailingPunctuation(candidate: string) {
  let href = candidate
  let trailingText = ""

  while (href) {
    const lastCharacter = href.at(-1) ?? ""

    if (ALWAYS_TRAILING_PUNCTUATION.has(lastCharacter)) {
      href = href.slice(0, -1)
      trailingText = `${lastCharacter}${trailingText}`
      continue
    }

    if (lastCharacter in CLOSING_PAIRS) {
      const openingCharacter = CLOSING_PAIRS[lastCharacter as keyof typeof CLOSING_PAIRS]
      if (countCharacter(href, lastCharacter) > countCharacter(href, openingCharacter)) {
        href = href.slice(0, -1)
        trailingText = `${lastCharacter}${trailingText}`
        continue
      }
    }

    break
  }

  return { href, trailingText }
}

export function parseInlineMessage(text: string): InlineMessageSegment[] {
  return text.split(INLINE_TOKEN_PATTERN).filter(Boolean).flatMap((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return { kind: "strong", text: part.slice(2, -2) }
    }

    const markdownLink = part.match(
      /^\[([^\]]+)\]\(((?:(?:https?):\/\/|mailto:|tel:)[^)]+)\)$/,
    )
    if (markdownLink) {
      return { kind: "link", text: markdownLink[1], href: markdownLink[2] }
    }

    if (/^(?:https?:\/\/|mailto:|tel:)/.test(part)) {
      const { href, trailingText } = detachTrailingPunctuation(part)
      const link: InlineMessageSegment = {
        kind: "link",
        text: href.replace(/^mailto:/, ""),
        href,
      }

      return trailingText ? [link, { kind: "text", text: trailingText }] : link
    }

    return { kind: "text", text: part.replaceAll("**", "") }
  })
}
