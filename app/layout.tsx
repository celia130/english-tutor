import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "英语教学助手",
  description: "AI 英语学习伙伴 - 语法纠错、词汇解释、作文批改",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
