"use client";

import { useTheme } from "./ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  animate,
} from "framer-motion";
import { useState, useRef, useEffect } from "react";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const turbulence = useMotionValue(0);

  const handleToggle = (e: React.MouseEvent) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (overlayRef.current) {
      const overlay = overlayRef.current;

      overlay.style.left = `${x}px`;
      overlay.style.top = `${y}px`;

      const targetColor = darkMode ? "#f8fafc" : "#020617";

      overlay.style.background = `radial-gradient(circle, ${targetColor} 0%, ${targetColor} 100%)`;
      overlay.style.display = "block";

      animate(turbulence, 100, { duration: 0.4, ease: "easeIn" });

      const animation = overlay.animate(
        [
          {
            transform: "translate(-50%, -50%) scale(0)",
            filter: "url(#liquid-filter)",
          },
          {
            transform: "translate(-50%, -50%) scale(4)",
            filter: "url(#liquid-filter)",
          },
        ],
        {
          duration: 1000,
          easing: "cubic-bezier(0.25, 1, 0.5, 1)",
          fill: "forwards",
        }
      );

      setTimeout(() => {
        toggleTheme();
        animate(turbulence, 0, { duration: 0.6 });
      }, 400);

      animation.onfinish = () => {
        overlay.style.display = "none";
        setIsAnimating(false);
      };
    }
  };

  return (
    <>
      {/* SVG Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="liquid-filter">
            <HoloTurbulence turbulence={turbulence} />
            <feDisplacementMap in="SourceGraphic" scale="50" />
          </filter>
        </defs>
      </svg>

      {/* Expanding Liquid Overlay */}
      <div
        ref={overlayRef}
        className="fixed z-[9999] w-[100vmax] h-[100vmax] rounded-full pointer-events-none origin-center will-change-transform hidden"
      />

      {/* Button */}
      <div className="fixed top-6 right-6 z-[100]">
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl backdrop-blur-md border-2 transition-all duration-300 overflow-hidden group ${
            darkMode
              ? "bg-slate-900/80 border-cyan-500/30 shadow-cyan-500/20"
              : "bg-white/80 border-amber-500/30 shadow-amber-500/20"
          }`}
        >
          {/* Hover Glow */}
          <div
            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
              darkMode
                ? "bg-gradient-to-tr from-cyan-500 via-blue-500 to-purple-500"
                : "bg-gradient-to-tr from-amber-300 via-orange-400 to-rose-400"
            }`}
          />

          {/* Inner Background */}
          <div
            className={`absolute inset-[2px] rounded-full z-0 transition-colors duration-300 ${
              darkMode ? "bg-slate-950" : "bg-white"
            }`}
          />

          {/* Icons */}
          <div className="relative z-10">
            <AnimatePresence mode="wait" initial={false}>
              {darkMode ? (
                <motion.div
                  key="moon"
                  initial={{ y: -30, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 30, opacity: 0, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <FaMoon className="text-2xl text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ y: 30, opacity: 0, rotate: 90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: -30, opacity: 0, rotate: -90 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <FaSun className="text-2xl text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Orbiting Particles */}
          <div className="absolute inset-0 pointer-events-none animate-[spin_10s_linear_infinite]">
            <div
              className={`absolute top-1 left-1/2 w-1 h-1 rounded-full ${
                darkMode ? "bg-cyan-400" : "bg-amber-400"
              }`}
            />
            <div
              className={`absolute bottom-2 right-1/2 w-1.5 h-1.5 rounded-full ${
                darkMode ? "bg-purple-400" : "bg-rose-400"
              }`}
            />
          </div>
        </motion.button>
      </div>
    </>
  );
}

/* HoloTurbulence Component
   Binds the motion value to the <feTurbulence> baseFrequency.
*/
function HoloTurbulence({ turbulence }: { turbulence: any }) {
  const ref = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    const unsubscribe = turbulence.onChange((value: number) => {
      if (ref.current) {
        ref.current.setAttribute("baseFrequency", `${value / 100}`);
      }
    });

    return () => unsubscribe();
  }, [turbulence]);

  return (
    <feTurbulence
      ref={ref}
      type="turbulence"
      baseFrequency="0"
      numOctaves="1"
      result="TURB"
    />
  );
}
