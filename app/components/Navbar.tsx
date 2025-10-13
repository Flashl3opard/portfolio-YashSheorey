"use client";

import React, { useState, useEffect } from "react";
import { MdHome } from "react-icons/md";
import { FaLaptopCode, FaFolderOpen } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { PiLinkSimpleBold } from "react-icons/pi";
import { IoBriefcase } from "react-icons/io5";
import { motion } from "framer-motion";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  target: string;
}

const Navbar: React.FC = () => {
  const [active, setActive] = useState("Home");

  const menuItems: MenuItem[] = [
    { id: "MVPSection", icon: <MdHome size={22} />, target: "MVPSection" },
    { id: "About", icon: <CgProfile size={22} />, target: "about" },
    { id: "Skills", icon: <FaLaptopCode size={22} />, target: "skills" },
    { id: "Projects", icon: <FaFolderOpen size={22} />, target: "projects" },
    { id: "Experience", icon: <IoBriefcase size={22} />, target: "experience" },
    { id: "Contact", icon: <PiLinkSimpleBold size={22} />, target: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offsets = menuItems.map((item) => {
        const el = document.getElementById(item.target);
        if (!el) return { id: item.id, offset: 0 };
        const rect = el.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        return { id: item.id, offset: top };
      });

      const current = offsets
        .reverse()
        .find((o) => scrollY + 200 >= o.offset)?.id;
      if (current && current !== active) setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [active]);

  const handleClick = (target: string, id: string) => {
    setActive(id);
    const element = document.getElementById(target);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <ul className="backdrop-blur-md shadow-xl rounded-full px-6 py-3 flex gap-4 items-center text-white bg-white/10 border border-white/20 transition-all duration-500">
        {menuItems.map((item) => (
          <motion.li
            key={item.id}
            onClick={() => handleClick(item.target, item.id)}
            className={`p-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${
              active === item.id
                ? "bg-cyan-400/30 text-white shadow-[0_0_15px_cyan] scale-110"
                : "hover:bg-white/20"
            }`}
            title={item.id}
            whileTap={{ scale: 0.9 }}
          >
            {item.icon}
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
