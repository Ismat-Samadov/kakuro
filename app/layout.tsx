import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nonogram - Picross Puzzle Game",
  description: "Play the classic Nonogram puzzle game with keyboard navigation",
  keywords: ["nonogram", "picross", "puzzle", "game", "logic puzzle", "brain teaser"],
  authors: [{ name: "Nonogram Game" }],
  creator: "Nonogram Game",
  openGraph: {
    title: "Nonogram - Picross Puzzle Game",
    description: "Play the classic Nonogram puzzle game with keyboard navigation",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
