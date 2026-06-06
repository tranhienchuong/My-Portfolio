"use client";

import dynamic from "next/dynamic";

export const AiAssistantDynamic = dynamic(
  () => import("./ai-assistant-widget").then((mod) => mod.AiAssistantWidget),
  {
    ssr: false,
  },
);
