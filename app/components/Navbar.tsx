"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MdHome } from "react-icons/md";
import { FaLaptopCode, FaFolderOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoBriefcase } from "react-icons/io5";
import { motion } from "framer-motion";

// ---
// 1. Types and Menu Items moved *outside* the component.
// This prevents them from being recreated on every render, which is better for performance.
// I've also added a "label" for the active state and title, as it's more descriptive.
// ---
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  target: string; // The ID of the section to scroll to
}

const menuItems: MenuItem[] = [
  { label: "Home", icon: <MdHome size={22} />, target: "MVPSection" },
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

const Navbar: React.FC = () => {
  // 2. Active state now uses the "label" (e.g., "Home"), which is more readable.
  const [active, setActive] = useState(menuItems[0].label);

  // ---
  // 3. Optimized scroll handler using useCallback.
  // This memoizes the function so it isn't recreated on every render,
  // preventing the useEffect from running unnecessarily.
  // ---
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    // Find the current active section
    let currentActive = menuItems[0].label; // Default to "Home"
    for (const item of menuItems) {
      const el = document.getElementById(item.target);
      if (el) {
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        // 4. Threshold is slightly adjusted. 150px from the top.
        if (scrollY + 150 >= top) {
          currentActive = item.label;
        }
      }
    }

    if (currentActive !== active) {
      setActive(currentActive);
    }
    // 'active' is the only dependency that should trigger a re-creation of this function
  }, [active]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // 'handleScroll' is now a stable dependency thanks to useCallback
  }, [handleScroll]);

  const handleClick = (target: string, label: string) => {
    setActive(label);
    const element = document.getElementById(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 5. Added keydown handler for accessibility (Enter/Space to click)
  const handleKeyDown = (
    e: React.KeyboardEvent,
    target: string,
    label: string
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(target, label);
    }
  };

  return (
    // ---
    // 6. RESPONSIVE CONTAINER:
    // Mobile: Fixed to bottom, full-width with padding.
    // Desktop (md:): Fixed to top, centered, auto-width.
    // ---
    <nav className="fixed z-50 bottom-4 w-full px-4 md:px-0 md:w-auto md:top-6 md:left-1/2 md:transform md:-translate-x-1/2 md:bottom-auto">
      {/*
        7. RESPONSIVE LIST:
        Mobile: Full-width (capped at max-w-sm), centered, justify-around.
        Desktop (md:): Auto-width, standard gap.
      */}
      <ul className="flex items-center justify-around md:justify-center w-full max-w-sm mx-auto md:w-auto md:gap-4 backdrop-blur-md shadow-xl rounded-full px-6 py-3 text-white bg-white/10 border border-white/20">
        {menuItems.map((item) => (
          <motion.li
            key={item.label}
            onClick={() => handleClick(item.target, item.label)}
            onKeyDown={(e) => handleKeyDown(e, item.target, item.label)}
            className={`p-2 rounded-full cursor-pointer transition-colors duration-300 flex items-center justify-center relative ${
              active !== item.label ? "hover:bg-white/20" : "text-white"
            }`}
            title={item.label}
            role="button" // 8. Accessibility: Identify as a button
            tabIndex={0} // 8. Accessibility: Make it keyboard-focusable
            whileTap={{ scale: 0.9 }}
          >
            {/*
              9. "MAGIC MOVE" ANIMATION:
              This div is the visual active state.
              The 'layoutId="active-pill"' tells Framer Motion to animate
              this element from its old position to its new position when 'active' changes.
            */}
            {active === item.label && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-cyan-400/30 shadow-[0_0_15px_cyan]"
                style={{ borderRadius: 9999 }} // Force rounded-full during animation
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {/* 10. Icon is relative to sit on top of the animation */}
            <span className="relative z-10">{item.icon}</span>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
