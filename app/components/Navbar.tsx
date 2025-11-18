"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { MdHome } from "react-icons/md";
import { FaLaptopCode, FaFolderOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoBriefcase } from "react-icons/io5";
import {
  motion,
  useScroll,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
   Types & Data
--------------------------------------------*/
interface MenuItem {
  label: string;
  icon: React.ReactNode;
  target: string;
}

const menuItems: MenuItem[] = [
  { label: "Home", icon: <MdHome size={24} />, target: "home" },
  { label: "About", icon: <CgProfile size={24} />, target: "about" },
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
   Magnetic Wrapper Component
   (Creates the "pulling" effect towards mouse)
--------------------------------------------*/
const MagneticItem = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    position.x.set(middleX * 0.3); // Movement strength
    position.y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    position.x.set(0);
    position.y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* -----------------------------------------
   Navbar Component
--------------------------------------------*/
const Navbar: React.FC = () => {
  const { darkMode } = useTheme();
  const [active, setActive] = useState(menuItems[0].label);
  const [visible, setVisible] = useState(true);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  /* -----------------------------------------
     Scroll Logic
  --------------------------------------------*/
  const handleScroll = useCallback(() => {
    const currentScroll = window.scrollY;

    // Active Section Detection
    let currentActive = active;
    for (const item of menuItems) {
      const section = document.getElementById(item.target);
      if (section) {
        const rect = section.getBoundingClientRect();
        // Trigger slightly before the section hits top of viewport
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          currentActive = item.label;
        }
      }
    }
    if (currentActive !== active) setActive(currentActive);

    // Visibility Logic (Hide on scroll down, show on up)
    if (currentScroll > lastScrollY.current && currentScroll > 100) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    lastScrollY.current = currentScroll;
  }, [active]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleClick = (target: string, label: string) => {
    setActive(label);
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* -----------------------------------------
     Render
  --------------------------------------------*/
  return (
    <div className="fixed z-50 w-full flex justify-center bottom-6 md:bottom-8 px-4 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: visible ? 0 : 120,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`pointer-events-auto flex items-center gap-2 px-4 py-3 rounded-full backdrop-blur-xl border shadow-2xl transition-colors duration-500 ${
          darkMode
            ? "bg-black/40 border-white/10 shadow-[0_10px_40px_-10px_rgba(0,255,255,0.1)]"
            : "bg-white/60 border-white/40 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)]"
        }`}
      >
        {menuItems.map((item) => {
          const isActive = active === item.label;

          return (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setHoveredTab(item.label)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              {/* Hover Tooltip (Floating Label) */}
              <AnimatePresence>
                {hoveredTab === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -15, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute -top-8 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none ${
                      darkMode
                        ? "bg-cyan-950/90 text-cyan-200 border border-cyan-500/30"
                        : "bg-white text-slate-800 border border-slate-200 shadow-lg"
                    }`}
                  >
                    {item.label}
                    {/* Tiny Triangle Arrow */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent ${
                        darkMode ? "border-t-cyan-950/90" : "border-t-white"
                      }`}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <MagneticItem
                onClick={() => handleClick(item.target, item.label)}
                className={`relative z-10 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isActive
                    ? darkMode
                      ? "text-white"
                      : "text-white"
                    : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {/* The Active "Pill" Background */}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute inset-0 rounded-full -z-10 ${
                      darkMode
                        ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                        : "bg-gradient-to-br from-blue-500 to-violet-600 shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                    }`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon Scale Animation */}
                <motion.span
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.icon}
                </motion.span>

                {/* Little dot indicator below icon if active */}
                {isActive && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-white"
                  />
                )}
              </MagneticItem>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Navbar;
