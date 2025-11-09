"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MdHome } from "react-icons/md";
import { FaLaptopCode, FaFolderOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoBriefcase } from "react-icons/io5";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext"; // ✅ Import global theme context

/* -----------------------------------------
   Types + Menu Items (Static outside component)
--------------------------------------------*/
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  target: string; // section ID to scroll to
}

const menuItems: MenuItem[] = [
  { label: "Home", icon: <MdHome size={22} />, target: "home" },
  { label: "About", icon: <CgProfile size={22} />, target: "about" },
  { label: "Skills", icon: <FaLaptopCode size={22} />, target: "skills" },
  { label: "Projects", icon: <FaFolderOpen size={22} />, target: "projects" },
  {
    label: "Experience",
    icon: <IoBriefcase size={22} />,
    target: "experience",
  },
  { label: "Contact", icon: <PiLinkSimpleBold size={22} />, target: "contact" },
];

/* -----------------------------------------
   Navbar Component
--------------------------------------------*/
const Navbar: React.FC = () => {
  const { darkMode } = useTheme(); // ✅ React to global theme changes
  const [active, setActive] = useState(menuItems[0].label);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  /* -----------------------------------------
     Active Section Highlight on Scroll
  --------------------------------------------*/
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    let currentActive = menuItems[0].label;

    for (const item of menuItems) {
      const section = document.getElementById(item.target);
      if (section) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        if (scrollY + 150 >= top) {
          currentActive = item.label;
        }
      }
    }

    if (currentActive !== active) setActive(currentActive);

    // Hide navbar on scroll down, show on scroll up
    if (scrollY > lastScrollY && scrollY > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setLastScrollY(scrollY);
  }, [active, lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* -----------------------------------------
     Smooth Scroll Navigation
  --------------------------------------------*/
  const handleClick = (target: string, label: string) => {
    setActive(label);
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    target: string,
    label: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(target, label);
    }
  };

  /* -----------------------------------------
     Theme-Based Styles
  --------------------------------------------*/
  const baseClasses =
    "flex items-center justify-around md:justify-center w-full max-w-sm mx-auto md:w-auto md:gap-4 backdrop-blur-md shadow-lg rounded-full px-6 py-3 border transition-all duration-500";
  const themeClasses = darkMode
    ? "bg-white/10 border-white/20 text-white shadow-[0_0_20px_rgba(0,255,255,0.15)]"
    : "bg-gray-100/60 border-gray-300 text-gray-800 shadow-[0_0_20px_rgba(255,0,255,0.15)]";

  const hoverClasses = darkMode
    ? "hover:bg-cyan-400/20 hover:text-cyan-300"
    : "hover:bg-fuchsia-300/30 hover:text-fuchsia-700";

  const activePillClasses = darkMode
    ? "bg-cyan-400/30 shadow-[0_0_20px_cyan]"
    : "bg-fuchsia-400/40 shadow-[0_0_20px_fuchsia]";

  /* -----------------------------------------
     Render Navbar
  --------------------------------------------*/
  return (
    <motion.nav
      className={`fixed z-50 bottom-4 w-full px-4 md:px-0 md:w-auto md:top-6 md:left-1/2 md:-translate-x-1/2 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ul className={`${baseClasses} ${themeClasses}`}>
        {menuItems.map((item) => (
          <motion.li
            key={item.label}
            onClick={() => handleClick(item.target, item.label)}
            onKeyDown={(e) => handleKeyDown(e, item.target, item.label)}
            className={`p-2 rounded-full cursor-pointer flex items-center justify-center relative transition-all duration-300 ${hoverClasses}`}
            title={item.label}
            role="button"
            tabIndex={0}
            whileTap={{ scale: 0.9 }}
          >
            {active === item.label && (
              <motion.div
                layoutId="active-pill"
                className={`absolute inset-0 ${activePillClasses}`}
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10">{item.icon}</span>
          </motion.li>
        ))}
      </ul>

      {/* Optional: subtle glow ring behind navbar */}
      <div
        className={`absolute inset-0 blur-3xl -z-10 rounded-full transition-all duration-700 ${
          darkMode
            ? "bg-cyan-500/10 animate-pulse"
            : "bg-fuchsia-500/10 animate-pulse-slow"
        }`}
      ></div>
    </motion.nav>
  );
};

export default Navbar;
