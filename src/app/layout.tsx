import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RecruitAI - Smart Recruitment Platform",
  description: "Create job forms, review AI screening results, and manage candidates",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
