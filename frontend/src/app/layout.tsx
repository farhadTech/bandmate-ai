import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BandMate AI",
  description: "AI-powered IELTS preparation platform",
};

export default function RootLayout ( {
  children,
}: Readonly<{
  children: React.ReactNode;
}> ) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300">
        { children }
      </body>
    </html>
  );
}