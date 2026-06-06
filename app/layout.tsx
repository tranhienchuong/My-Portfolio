import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AiAssistantDynamic } from "@/components/ai-assistant/ai-assistant-dynamic";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
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
          <AiAssistantDynamic />
          <CyberCursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
