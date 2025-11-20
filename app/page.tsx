"use client";

import { useEffect, useState } from "react"; // ✨ ADDED useState
import { AnimatePresence, motion } from "framer-motion"; // ✨ ADDED
import OrbitalLoader from "./components/OrbitalLoader"; // ✨ ADDED

import MVPsection from "./components/MVPsection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Certificates from "./components/Certificates";

export default function Home() {
  // ✨ Loader state
  const [isLoading, setIsLoading] = useState(true);

  // Smooth scroll for all internal links
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  // ✨ Loader timer logic
  useEffect(() => {
    // This timer simulates your page's asset loading.
    // Set it to a duration you like (e.g., 3000ms = 3 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty array [] ensures this effect runs only once

  return (
    // ✨ We use a React Fragment <> to hold both the loader and the main content
    <>
      {/* ===== LOADER ===== */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            // This 'exit' animation will run when isLoading becomes false
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <OrbitalLoader />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN PAGE CONTENT ===== */}
      <AnimatePresence>
        {!isLoading && (
          // ✨ We replace <main> with <motion.main> to animate it
          <motion.main
            key="page-content"
            // Start transparent
            initial={{ opacity: 0 }}
            // Fade in to full opacity
            animate={{ opacity: 1 }}
            // This transition fades in the content *after* the loader fades out
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
            //
            // ✨ All your original <main> classes are applied here
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
            <Certificates />
            <Contact />

            {/* ===== FOOTER ===== */}
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
