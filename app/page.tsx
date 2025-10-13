"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
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
    <AnimatePresence mode="wait">
      <motion.main
        className="relative flex flex-col items-center w-full overflow-x-hidden bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e] text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Navbar />

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
      </motion.main>
    </AnimatePresence>
  );
}
