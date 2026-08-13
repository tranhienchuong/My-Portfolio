import path from "node:path"
import { fileURLToPath } from "node:url"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv, type Plugin } from "vite"

import { createAiAssistantHttpHandler } from "./server/ai-assistant.ts"

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

function aiAssistantPlugin(mode: string): Plugin {
  const environment = loadEnv(mode, currentDirectory, "")
  const handleRequest = createAiAssistantHttpHandler({
    apiKey: environment.DEEPSEEK_API_KEY ?? process.env.DEEPSEEK_API_KEY,
    apiBase: environment.DEEPSEEK_API_BASE ?? process.env.DEEPSEEK_API_BASE,
    model:
      environment.DEEPSEEK_MODEL ?? process.env.DEEPSEEK_MODEL ?? "deepseek-v4-flash",
  })

  return {
    name: "portfolio-ai-assistant",
    configureServer(server) {
      server.middlewares.use("/api/ai-assistant", (request, response, next) => {
        void handleRequest(request, response).catch(next)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use("/api/ai-assistant", (request, response, next) => {
        void handleRequest(request, response).catch(next)
      })
    },
  }
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), aiAssistantPlugin(mode)],
  resolve: {
    alias: {
      "@": path.resolve(currentDirectory, "./src"),
    },
  },
}))
