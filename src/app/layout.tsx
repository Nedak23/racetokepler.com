import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Race to Kepler - Space Exploration Board Game",
  description: "Race to Kepler is an exciting board game where players compete in an interstellar journey to reach the Kepler system.",
  keywords: "board game, space game, strategy game, Race to Kepler, space exploration",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
