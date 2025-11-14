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

  const playWaveAnimation = () => {
    if (!waveRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const wave = waveRef.current;

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Show animation container
    gsap.set(container, { display: "block" });

    // Dynamic gradients based on theme transition
    const lightGradient =
      "bg-gradient-to-br from-white via-blue-200 to-fuchsia-300";
    const darkGradient =
      "bg-gradient-to-br from-blue-900 via-black to-purple-800";

    const switchingToDark = !darkMode;

    wave.className = `
      absolute rounded-full blur-[60px]
      ${switchingToDark ? darkGradient : lightGradient}
    `;

    // Dynamic scaling: ensures wave covers ANY screen
    const waveSize = Math.max(vw, vh) * 4; // large circle
    gsap.set(wave, {
      width: waveSize,
      height: waveSize,
      borderRadius: "50%",
      x: vw * 0.6,
      y: -vh * 0.6,
      scale: 0.05,
      opacity: 0.95,
    });

    let themeSwitched = false;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        gsap.to(wave, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(container, { display: "none" });
            setAnimating(false);
          },
        });
      },
    });

    // Main sweeping animation
    tl.to(wave, {
      duration: 1.25,
      x: -vw * 0.7,
      y: vh * 0.7,
      scale: 1.7,
      onUpdate: function () {
        if (!themeSwitched && this.progress() > 0.45) {
          themeSwitched = true;
          toggleTheme();
        }
      },
    });
  };

  const handleToggle = () => {
    if (animating) return;
    setAnimating(true);
    playWaveAnimation();
  };

  return (
    <>
      {/* WAVE ANIMATION LAYER */}
      <div
        ref={containerRef}
        className="fixed inset-0 pointer-events-none z-[70]"
        style={{ display: "none" }}
      >
        <div
          ref={waveRef}
          className="will-change-transform will-change-opacity"
        />
      </div>

      {/* TOGGLE BUTTON */}
      <motion.button
        onClick={handleToggle}
        whileTap={{ scale: 0.92 }}
        className="
          fixed top-4 right-4 z-[80] p-3 rounded-full
          bg-gray-200 dark:bg-gray-800 shadow-lg
          hover:shadow-xl hover:scale-[1.08]
          transition-all duration-300 flex items-center justify-center
        "
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
