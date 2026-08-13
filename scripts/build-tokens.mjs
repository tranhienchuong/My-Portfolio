import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(currentDirectory, "..")
const inputPath = path.join(projectRoot, "tokens", "design-tokens.json")
const outputPath = path.join(projectRoot, "src", "styles", "tokens.css")

const tokens = JSON.parse(fs.readFileSync(inputPath, "utf8"))

function kebab(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .toLowerCase()
}

function variableName(parts) {
  return `--${parts.map(kebab).join("-")}`
}

function cssValue(value) {
  if (Array.isArray(value)) return value.join(", ")
  if (typeof value !== "string") return String(value)

  return value.replace(/\{([^}]+)\}/g, (_, reference) =>
    `var(${variableName(reference.split("."))})`,
  )
}

function flatten(group, prefix, output = []) {
  for (const [key, value] of Object.entries(group ?? {})) {
    if (key.startsWith("$")) continue

    const tokenPath = [...prefix, key]
    if (value && typeof value === "object" && "$value" in value) {
      output.push([variableName(tokenPath), cssValue(value.$value)])
      continue
    }

    if (value && typeof value === "object") flatten(value, tokenPath, output)
  }

  return output
}

function block(selector, entries) {
  const declarations = entries.map(([name, value]) => `  ${name}: ${value};`).join("\n")
  return `${selector} {\n${declarations}\n}`
}

const primitive = flatten(tokens.primitive, ["primitive"])
const semantic = flatten(tokens.semantic, ["semantic"])
const component = flatten(tokens.component, ["component"])
const darkSemantic = flatten(tokens.dark?.semantic, ["semantic"])

const css = `/* Auto-generated from tokens/design-tokens.json. Do not edit directly. */

/* Layer 1: Primitives */
${block(":root", primitive)}

/* Layer 2: Semantic aliases */
${block(":root", semantic)}

/* Layer 3: Component aliases */
${block(":root", component)}

/* Dark section/theme overrides remain semantic so component aliases inherit them. */
${block(".dark", darkSemantic)}
`

fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, css)
console.log(`Generated ${path.relative(projectRoot, outputPath)}`)
