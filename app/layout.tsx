import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeSmart - AI-Powered Resume Builder",
  description: "Create ATS-optimized resumes that get you interviews. Professional templates, AI optimization, and instant downloads.",
  icons: {
    icon: [
      { url: '/favicon-64x64.png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${inter.variable} font-sans antialiased`}
          >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
