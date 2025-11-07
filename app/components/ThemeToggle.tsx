"use client";

import { useTheme } from "./ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="fixed top-4 right-4 z-50 p-3 rounded-full
        bg-gray-200 dark:bg-gray-800 
        shadow-md hover:shadow-lg transition-all duration-300
        hover:scale-110 flex items-center justify-center"
      aria-label="Toggle Theme"
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
            <FaSun className="text-yellow-400 text-xl drop-shadow-[0_0_6px_#facc15]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <FaMoon className="text-gray-700 text-xl drop-shadow-[0_0_4px_#64748b]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optional glowing aura */}
      <motion.span
        className="absolute inset-0 rounded-full blur-xl opacity-0"
        animate={{
          opacity: darkMode ? 0.4 : 0.2,
          background: darkMode
            ? "radial-gradient(circle, rgba(250,204,21,0.2), transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)",
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </motion.button>
  );
}
