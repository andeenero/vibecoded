import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIBECODED - Daily Digital Oracle",
  description: "A daily practice in digital minimalism, AI wisdom, and manifestation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&family=Playfair+Display:wght@400;700&family=Montaga&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}