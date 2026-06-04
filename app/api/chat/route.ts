import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import {
  experience,
  experiments,
  featuredCaseStudy,
  processSteps,
  profile,
  projects,
  skills,
  stats,
} from "@/lib/portfolio";

export const runtime = "nodejs";

const portfolioContext = {
  profile,
  stats,
  skills,
  projects: projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    type: project.type,
    category: project.category,
    status: project.status,
    description: project.description,
    longDescription: project.longDescription,
    tags: project.tags,
    highlights: project.highlights,
    href: project.href,
    problem: project.problem,
    solution: project.solution,
    outcome: project.outcome,
    note: project.note,
  })),
  featuredCaseStudy,
  experiments,
  processSteps,
  experience,
};

const systemPrompt = `You are a lightweight AI Portfolio Assistant for Trần Hiến Chương.

Answer only about Trần Hiến Chương, this portfolio, skills, projects, experiments, the featured case study, process, and contact information.
Use only the portfolio context below as your source of truth. If the portfolio context does not include something, say that it is not listed in the portfolio.
Do not invent companies, clients, users, awards, revenue, production metrics, testimonials, or outcomes.
Keep project labels honest: UI Concept, Practice Project, Personal Experiment, In Progress, Research Project, Mobile Prototype, and Personal Project.
If asked anything outside the portfolio scope, politely say you can only answer questions about the portfolio.
Do not give legal advice. If asked legal questions, say the legal-tech project is for legal-information and research support, not professional legal advice.
Keep replies concise and helpful.

Portfolio context:
${JSON.stringify(portfolioContext, null, 2)}`;

type ChatRequestBody = {
  message?: unknown;
};

function jsonReply(reply: string, status: number) {
  return NextResponse.json({ reply }, { status });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatRequestBody;
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return jsonReply("Please enter a question about the portfolio.", 400);
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return jsonReply("The AI assistant is not configured yet.", 500);
    }

    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      temperature: 0.2,
      max_tokens: 450,
    });

    const reply = completion.choices[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("Groq returned an empty response.");
    }

    return jsonReply(reply, 200);
  } catch (error) {
    console.error("AI assistant error:", error);
    return jsonReply("Sorry, the AI assistant could not respond right now.", 500);
  }
}
