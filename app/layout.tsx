import type { Metadata } from "next";
// 1. IMPORT ALDRICH AND REMOVE GEIST
import { Aldrich, Space_Mono } from "next/font/google";
import "./globals.css";
import { FaCode, FaBrain, FaSatellite } from "react-icons/fa";

// Aldrich (for headings / main text)
const aldrich = Aldrich({
  variable: "--font-aldrich",
  subsets: ["latin"],
  weight: ["400"], // Aldrich only comes in a single weight (400)
});

// Space Mono (for code / futuristic accent text)
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
    <html lang="en">
      <body
        // 3. UPDATE CLASSNAME TO USE ALDRICH
        className={`${aldrich.variable} ${spaceMono.variable} antialiased relative min-h-screen overflow-x-hidden text-white bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e]`}
      >
        {/* ===== Floating Gradient Glows ===== */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-72 h-72 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-[150px] animate-pulse-delay"></div>
        </div>

        {/* ===== Floating Icons ===== */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <FaCode className="absolute left-20 top-40 text-cyan-400/40 text-5xl animate-float" />
          <FaBrain className="absolute right-28 top-32 text-fuchsia-400/40 text-4xl animate-float-slow" />
          <FaSatellite className="absolute right-1/3 bottom-20 text-violet-400/40 text-5xl animate-float" />
        </div>

        {/* ===== Page Content ===== */}
        <div className="relative z-10">
          <div className="group">{children}</div>
        </div>
      </body>
    </html>
  );
}
