import { useCallback, useEffect, useRef, useState, type FormEvent } from "react"
import { Bot, Send, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  kind?: "message" | "error"
}

type AssistantResponse = {
  message?: string
}

const QUICK_COMMANDS = ["/projects", "/skills", "/contacts"] as const
const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I’m Chuong’s AI sidekick. Ask in English or Vietnamese about his projects, skills, or how to reach him. I’m evidence-grounded—with just enough playful hype.",
}

function createMessage(role: Message["role"], content: string, kind: Message["kind"] = "message") {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    kind,
  } satisfies Message
}

function TypingIndicator() {
  return (
    <div
      className="flex w-fit items-center gap-1 rounded-[var(--primitive-radius-xl)] rounded-bl-md border-2 border-border bg-surface/80 px-4 py-3 shadow-neo-sm backdrop-blur-sm"
      role="status"
    >
      <span className="sr-only">Ask My AI is typing</span>
      {[0, 1, 2].map((index) => (
        <span
          aria-hidden="true"
          className="ai-typing-dot size-2 rounded-full bg-primary-strong"
          key={index}
          style={{ animationDelay: `${index * 140}ms` }}
        />
      ))}
    </div>
  )
}

function InlineMessageContent({ text }: { text: string }) {
  const parts = text.split(
    /(\*\*[^*]+\*\*|\[[^\]]+\]\((?:(?:https?):\/\/|mailto:|tel:)[^)]+\)|(?:(?:https?):\/\/|mailto:|tel:)[^\s]+)/g,
  )

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>
    }

    const markdownLink = part.match(
      /^\[([^\]]+)\]\(((?:(?:https?):\/\/|mailto:|tel:)[^)]+)\)$/,
    )
    if (markdownLink) {
      return (
        <a
          className="font-semibold underline decoration-2 underline-offset-2"
          href={markdownLink[2]}
          key={`${part}-${index}`}
          rel={markdownLink[2].startsWith("http") ? "noreferrer" : undefined}
          target={markdownLink[2].startsWith("http") ? "_blank" : undefined}
        >
          {markdownLink[1]}
        </a>
      )
    }

    if (/^(?:https?:\/\/|mailto:|tel:)/.test(part)) {
      const href = part
      return (
        <a
          className="break-all font-semibold underline decoration-2 underline-offset-2"
          href={href}
          key={`${part}-${index}`}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          {part.replace(/^mailto:/, "")}
        </a>
      )
    }

    return part.replaceAll("**", "")
  })
}

function MessageContent({ content }: { content: string }) {
  return content.split("\n").map((line, index) => {
    const bullet = line.match(/^\s*[-*•]\s+(.+)$/)

    if (bullet) {
      return (
        <div className="mt-1.5 flex gap-2 first:mt-0" key={`${line}-${index}`}>
          <span aria-hidden="true" className="font-bold text-primary-strong">•</span>
          <span><InlineMessageContent text={bullet[1]} /></span>
        </div>
      )
    }

    if (!line.trim()) return <span className="block h-2" key={`space-${index}`} />

    return (
      <p className="mt-1.5 first:mt-0" key={`${line}-${index}`}>
        <InlineMessageContent text={line} />
      </p>
    )
  })
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] break-words rounded-[var(--primitive-radius-xl)] border-2 border-border px-4 py-3 text-sm leading-relaxed shadow-neo-sm",
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md bg-surface/85 text-foreground backdrop-blur-sm",
          message.kind === "error" && "bg-warning text-warning-foreground",
        )}
      >
        <MessageContent content={message.content} />
      </div>
    </div>
  )
}

function sleep(duration: number) {
  return new Promise((resolve) => window.setTimeout(resolve, duration))
}

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [liveAnnouncement, setLiveAnnouncement] = useState("")
  const triggerRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const closeWidget = useCallback(() => {
    setIsCommandMenuOpen(false)
    setIsOpen(false)
    window.setTimeout(() => triggerRef.current?.focus(), 0)
  }, [])

  const openWidget = () => {
    setHasOpened(true)
    setIsOpen(true)
  }

  useEffect(() => {
    if (!isOpen) return

    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 220)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return

      if (isCommandMenuOpen) {
        setIsCommandMenuOpen(false)
        inputRef.current?.focus()
        return
      }

      closeWidget()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [closeWidget, isCommandMenuOpen, isOpen])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: isTyping ? "auto" : "smooth" })
  }, [isTyping, messages])

  const revealAnswer = async (answer: string) => {
    const message = createMessage("assistant", "")
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      setMessages((current) => [...current, { ...message, content: answer }])
      setLiveAnnouncement(answer)
      return
    }

    const chunks = answer.split(/(\s+)/)
    setMessages((current) => [...current, message])

    for (let index = 0; index < chunks.length; index += 1) {
      const visibleContent = chunks.slice(0, index + 1).join("")
      setMessages((current) =>
        current.map((item) =>
          item.id === message.id ? { ...item, content: visibleContent } : item,
        ),
      )
      await sleep(chunks[index].trim() ? 22 : 8)
    }

    setLiveAnnouncement(answer)
  }

  const sendMessage = async (rawInput: string) => {
    const normalizedInput = rawInput.trim()
    if (!normalizedInput || isTyping) return

    const userMessage = createMessage("user", normalizedInput)
    const conversation = [...messages, userMessage]
    setMessages(conversation)
    setInput("")
    setIsCommandMenuOpen(false)
    setLiveAnnouncement("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: conversation
            .filter((message) => message.id !== "welcome" && message.kind !== "error")
            .slice(-10)
            .map(({ role, content }) => ({ role, content })),
        }),
      })
      const payload = (await response.json()) as AssistantResponse

      if (!response.ok || !payload.message) {
        throw new Error(payload.message ?? "Ask My AI could not answer that question.")
      }

      setIsTyping(false)
      await revealAnswer(payload.message)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Ask My AI could not answer just now. Please try again."
      setMessages((current) => [...current, createMessage("assistant", message, "error")])
      setLiveAnnouncement(message)
    } finally {
      setIsTyping(false)
      window.setTimeout(() => inputRef.current?.focus(), 0)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (input.trim() === "/") {
      setIsCommandMenuOpen(true)
      return
    }

    void sendMessage(input)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    setIsCommandMenuOpen(value.trim() === "/")
  }

  return (
    <aside className="ai-assistant-root print:hidden" aria-label="AI portfolio assistant">
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {liveAnnouncement}
      </span>

      {isOpen ? (
        <section
          aria-labelledby="ai-assistant-title"
          aria-modal="false"
          className="ai-assistant-panel animate-dialog-in flex flex-col overflow-hidden border-2 border-border shadow-neo-lg"
          id="ai-assistant-panel"
          role="dialog"
        >
          <header className="flex items-center justify-between gap-3 border-b-2 border-border bg-gradient-to-br from-note/90 via-surface/80 to-secondary/90 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-control border-2 border-border bg-primary shadow-neo-sm">
                <Bot aria-hidden="true" className="size-5" strokeWidth={2.25} />
              </span>
              <h2 className="truncate font-display text-base font-semibold text-heading" id="ai-assistant-title">
                Hỏi AI về tôi (Ask my AI)
              </h2>
            </div>
            <Button
              aria-label="Close Ask My AI"
              className="shrink-0 bg-surface/80 shadow-neo-sm"
              onClick={closeWidget}
              size="icon"
              type="button"
              variant="outline"
            >
              <X aria-hidden="true" />
            </Button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4" aria-label="Conversation">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {isTyping ? <TypingIndicator /> : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t-2 border-border bg-surface/70 p-3 backdrop-blur-md">
            <div className="relative">
              {isCommandMenuOpen ? (
                <div
                  aria-label="Quick commands"
                  className="animate-dialog-in absolute bottom-[calc(100%+var(--primitive-spacing-3))] left-0 z-10 flex w-44 flex-col gap-2 rounded-surface border-2 border-border bg-surface/95 p-2 shadow-neo backdrop-blur-md"
                  id="ai-command-menu"
                  role="group"
                >
                  {QUICK_COMMANDS.map((command) => (
                    <button
                      className="clay-button min-h-11 rounded-control border-2 border-border bg-note px-3 text-left font-mono text-xs font-semibold shadow-neo-sm disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isTyping}
                      key={command}
                      onClick={() => void sendMessage(command)}
                      type="button"
                    >
                      {command}
                    </button>
                  ))}
                </div>
              ) : null}

              <form className="flex items-end gap-2" onSubmit={handleSubmit}>
                <button
                  aria-controls="ai-command-menu"
                  aria-expanded={isCommandMenuOpen}
                  aria-label="Show quick commands"
                  className="clay-button grid size-12 shrink-0 place-items-center rounded-control border-2 border-border bg-note font-mono text-xl font-bold shadow-neo-sm disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isTyping}
                  onClick={() => {
                    setIsCommandMenuOpen((current) => !current)
                    inputRef.current?.focus()
                  }}
                  type="button"
                >
                  /
                </button>
                <div className="min-w-0 flex-1">
                  <label className="sr-only" htmlFor="ai-assistant-input">
                    Ask a question about Tran Hien Chuong
                  </label>
                  <input
                    className="min-h-12 w-full rounded-control border-2 border-[var(--component-input-border)] bg-[var(--component-input-bg)] px-4 py-2.5 text-base text-[var(--component-input-fg)] shadow-neo-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--component-input-focus)] disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isTyping}
                    id="ai-assistant-input"
                    maxLength={500}
                    onChange={(event) => handleInputChange(event.target.value)}
                    placeholder="Ask me anything…"
                    ref={inputRef}
                    value={input}
                  />
                </div>
                <Button
                  aria-label="Send message"
                  className="size-12 shrink-0"
                  disabled={!input.trim() || isTyping}
                  size="icon"
                  type="submit"
                >
                  <Send aria-hidden="true" />
                </Button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex items-end gap-3">
          {!hasOpened ? (
            <button
              className="ai-assistant-teaser clay-hover max-w-48 rounded-surface border-2 border-border bg-surface px-4 py-3 text-left shadow-neo-lg"
              onClick={openWidget}
              type="button"
            >
              <span className="block font-display text-sm font-semibold leading-snug text-heading">
                Want the story behind the metrics?
              </span>
              <span className="mt-1 block text-xs font-medium text-muted-foreground">Ask my AI →</span>
            </button>
          ) : null}
          <div className="relative">
            {!hasOpened ? (
              <span className="absolute -right-0.5 -top-0.5 z-10 grid size-6 place-items-center rounded-full border-2 border-border bg-accent font-mono text-[0.6875rem] font-bold text-accent-foreground">
                <span className="ai-notification-ping absolute inset-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="relative">1</span>
                <span className="sr-only">New: ask my AI assistant</span>
              </span>
            ) : null}
            <button
              aria-controls="ai-assistant-panel"
              aria-expanded="false"
              aria-label="Open Ask My AI"
              className="ai-assistant-trigger clay-button grid size-16 place-items-center rounded-full border-2 border-border bg-primary text-primary-foreground shadow-neo-lg"
              onClick={openWidget}
              ref={triggerRef}
              type="button"
            >
              <Bot aria-hidden="true" className="size-7" strokeWidth={2.25} />
              <Sparkles aria-hidden="true" className="absolute right-3 top-3 size-3.5" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}
