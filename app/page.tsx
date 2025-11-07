"use client";

import { useEffect } from "react";
// AnimatePresence and motion are GONE (moved to ClientWrapper)
// Navbar is GONE (moved to ClientWrapper)

import MVPsection from "./components/MVPsection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function Home() {
  // Smooth scroll for all internal links
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    // The AnimatePresence/motion wrapper is GONE
    <main
      // This 'main' tag matches the layout's light/dark mode.
      // We apply the same logic here to ensure the *page* itself
      // also has the base colors, preventing any layout flashes.
      className="relative flex flex-col items-center w-full overflow-x-hidden 
        bg-gradient-to-br from-[#f5f5ff] via-[#e8f0ff] to-[#dfe9ff] text-gray-900
        dark:bg-gradient-to-br dark:from-[#050510] dark:via-[#0b0f25] dark:to-[#09172e] dark:text-white"
    >
      {/* Navbar is GONE */}

      {/* ===== HERO / MVP ===== */}
      <MVPsection />

      {/* ===== ABOUT ===== */}
      <About />

      {/* ===== SKILLS ===== */}
      <Skills />

      {/* ===== PROJECTS ===== */}
      <Projects />

      {/* ===== EXPERIENCE ===== */}
      <Experience />

      {/* ===== CONTACT ===== */}
      <Contact />

      {/* ===== FOOTER ===== */}
    </main>
  );
}
