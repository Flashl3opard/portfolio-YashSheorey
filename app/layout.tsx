import type { Metadata } from "next";
import { Aldrich, Space_Mono } from "next/font/google";
import "./globals.css";
// Removed FaCode, FaBrain, etc. - They don't belong here.
import ClientWrapper from "./components/ClientWrapper"; // Assuming ClientWrapper is in components

// ===== Fonts =====
const aldrich = Aldrich({
  variable: "--font-aldrich",
  subsets: ["latin"],
  weight: ["400"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Yash Sheorey Portfolio",
  description: "Futuristic UI Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
