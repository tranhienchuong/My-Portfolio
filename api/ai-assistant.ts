import { createAiAssistantHttpHandler } from "../server/ai-assistant.ts"

export default createAiAssistantHttpHandler({
  apiKey: process.env.DEEPSEEK_API_KEY,
  apiBase: process.env.DEEPSEEK_API_BASE,
  model: process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash",
})
