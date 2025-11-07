"use client";

import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useTheme } from "./ThemeContext"; // Adjust path if needed

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-6 right-6 z-50 p-3 bg-white/10 dark:bg-black/20 backdrop-blur-md border border-white/20 dark:border-gray-700 rounded-full hover:scale-110 transition-all duration-300"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <MdLightMode className="text-yellow-300 text-2xl" />
      ) : (
        <MdDarkMode className="text-gray-800 text-2xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
