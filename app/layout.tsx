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
      <body
        className={`${aldrich.variable} ${spaceMono.variable} antialiased relative min-h-screen overflow-x-hidden transition-all duration-500
        
          // --- FIXED ---
          // DEFAULT (Light Mode) STYLES
          bg-gradient-to-br from-[#f5f5ff] via-[#e8f0ff] to-[#dfe9ff] text-gray-900
          
          // DARK STYLES (with 'dark:' prefix)
          dark:bg-gradient-to-br dark:from-[#050510] dark:via-[#0b0f25] dark:to-[#09172e] dark:text-white
        `}
      >
        <ClientWrapper>{children}</ClientWrapper>

        {/* DELETED the global Gradient Glows and Floating Icons.
          They belong in your MVPsection, not floating over your entire site.
        */}
      </body>
    </html>
  );
}
