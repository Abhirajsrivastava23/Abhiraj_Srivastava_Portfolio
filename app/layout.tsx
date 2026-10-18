import type { Metadata } from "next";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgressSquare } from "@/components/ui/ScrollProgressSquare";
import { siteConfig } from "@/constants/content";

export const metadata: Metadata = {
  title: `${siteConfig.fullName} — Portfolio`,
  description: `Portfolio of ${siteConfig.fullName} — ${siteConfig.title}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="noise" />
        
        {/* Ambient liquid orbs for global glassmorphism effect */}
        <div className="glass-orb bg-accent/20 w-[45vw] h-[45vw] top-[-10%] left-[-10%] animate-[liquidBlob_20s_ease-in-out_infinite_alternate]" />
        <div className="glass-orb bg-white/5 w-[55vw] h-[55vw] bottom-[-20%] right-[-10%] animate-[liquidBlob_25s_ease-in-out_infinite_alternate_reverse]" />
        <div className="glass-orb bg-accent/10 w-[35vw] h-[35vw] top-[30%] left-[60%] animate-[liquidBlob_18s_ease-in-out_infinite_alternate]" />
        
        <CustomCursor />
        <ScrollProgressSquare />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
