import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AiAssistantWidget } from "@/components/ai-assistant/ai-assistant-widget";
import { AnimatedBackground } from "@/components/effects/animated-background";
import { CyberCursor } from "@/components/effects/CyberCursor";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/lib/portfolio";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.role}`,
  description:
    "A creative frontend portfolio featuring AI-assisted projects, legal-tech research, mobile prototypes, and colorful interactive web interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={geist.variable} lang="en">
      <body suppressHydrationWarning>
        <SmoothScrollProvider>
          <AnimatedBackground />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <AiAssistantWidget />
          <CyberCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
