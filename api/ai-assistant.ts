import { createAiAssistantWebHandler } from "../server/ai-assistant.ts"

const handleRequest = createAiAssistantWebHandler({
  apiKey: process.env.DEEPSEEK_API_KEY,
  apiBase: process.env.DEEPSEEK_API_BASE,
  model: process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash",
})

export default {
  fetch(request: Request) {
    return handleRequest(request)
  },
}
