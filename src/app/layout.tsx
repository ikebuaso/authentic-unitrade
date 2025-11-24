import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UniTrade - Campus Marketplace",
  description: "Buy and sell items on campus with UniTrade - the minimalist marketplace for students.",
  keywords: ["UniTrade", "marketplace", "campus", "students", "buy", "sell"],
  authors: [{ name: "UniTrade Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "UniTrade - Campus Marketplace",
    description: "Buy and sell items on campus with UniTrade",
    url: "https://unitrade.app",
    siteName: "UniTrade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UniTrade - Campus Marketplace",
    description: "Buy and sell items on campus with UniTrade",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
