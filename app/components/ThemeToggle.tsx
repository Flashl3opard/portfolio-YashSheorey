"use client";

import { useTheme } from "./ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  const [animating, setAnimating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  const playCurvedSweep = () => {
    if (!waveRef.current || !containerRef.current) return;

    const wave = waveRef.current;
    const container = containerRef.current;

    // Show container (IMPORTANT FIX)
    gsap.set(container, { display: "block" });

    // Gradient depending on what theme we are switching INTO
    const lightGradient =
      "bg-gradient-to-br from-white via-pink-200 to-pink-400";
    const darkGradient =
      "bg-gradient-to-br from-blue-900 via-black to-blue-700";

    const switchingToDark = !darkMode;

    wave.className = `
      absolute rounded-full blur-[40px]
      w-[3000px] h-[3000px]
      ${switchingToDark ? darkGradient : lightGradient}
    `;

    // Start wave off-screen (TOP-RIGHT)
    gsap.set(wave, {
      x: "70vw",
      y: "-70vh",
      scale: 0.1,
      opacity: 1,
    });

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        toggleTheme();

        gsap.to(wave, {
          opacity: 0,
          duration: 0.4,
          onComplete: () => {
            gsap.set(container, { display: "none" });
            setAnimating(false);
          },
        });
      },
    });

    // TRUE diagonal sweep (TOP-RIGHT → BOTTOM-LEFT)
    tl.to(wave, {
      x: "-80vw",
      y: "80vh",
      scale: 4,
      duration: 1,
    });
  };

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    playCurvedSweep();
  };

  return (
    <>
      {/* FIXED CONTAINER — stays invisible until animation */}
      <div
        ref={containerRef}
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{ display: "none" }}
      >
        <div ref={waveRef} />
      </div>

      {/* BUTTON */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-50 p-3 rounded-full
          bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-lg 
          transition-all duration-300 hover:scale-110 flex items-center justify-center"
      >
        <AnimatePresence mode="wait" initial={false}>
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <FaSun className="text-yellow-400 text-xl" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <FaMoon className="text-gray-700 text-xl" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
