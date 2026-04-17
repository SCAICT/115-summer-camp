import type { Metadata } from "next";
import { Azeret_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const azeretMono = Azeret_Mono({
  variable: "--font-azeret-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SCAICT 115 聯合暑訓 — Docker × AI API 部署實戰",
  description:
    "SCAICT 2026 聯合暑訓，以「Docker 部署 AI API」為主題的三天密集技術工作坊。從 Dockerfile 到雲端上線，帶你走完完整 MLOps 流程。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${spaceGrotesk.variable} ${azeretMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
