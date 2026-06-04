import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { AnimatedBackground } from "@/components/effects/animated-background";
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
  description: profile.summary,
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
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
