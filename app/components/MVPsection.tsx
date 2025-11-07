"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import {
  FaCode,
  FaBrain,
  FaSatellite,
  FaGithub,
  FaLinkedinIn,
  FaDiscord,
  FaTwitter,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext"; // ✅ Use global theme context

/* ------------------------------
    Configurable MVP Content
---------------------------------*/
const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "AI Enthusiast",
  "Linux Kernel Developer",
  "Open Source Contributor",
];

const techStack = [
  "React.js",
  "Next.js",
  "Express.js",
  "Tailwind CSS",
  "Appwrite",
  "MongoDB",
];

const socials = [
  {
    icon: <FaGithub />,
    href: "https://github.com/Flashl3opard",
    label: "GitHub",
  },
  {
    icon: <FaLinkedinIn />,
    href: "https://www.linkedin.com/in/yash-sheorey/",
    label: "LinkedIn",
  },
  {
    icon: <FaDiscord />,
    href: "https://discord.com/users/YashDiscordID",
    label: "Discord",
  },
  { icon: <FaTwitter />, href: "https://x.com/flashl3opard", label: "Twitter" },
];

/* ------------------------------
    Glow Orb Component
---------------------------------*/
const GlowOrb = ({
  position,
  color,
  size,
  blur,
  delay,
}: {
  position: string;
  color: string;
  size: string;
  blur: string;
  delay?: string;
}) => (
  <div
    className={`absolute ${position} ${size} ${color} ${blur} rounded-full opacity-30 animate-pulse-slow`}
    style={{ animationDelay: delay || "0s" }}
  />
);

/* ------------------------------
    Main MVP Section
---------------------------------*/
const MVPsection: React.FC = () => {
  const { darkMode } = useTheme(); // ✅ Use theme context instead of local state

  const [roleIndex, setRoleIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  /* Cycle through roles */
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  /* Typing effect for tech stack */
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!reverse && subIndex === techStack[techIndex].length) {
          setReverse(true);
          return;
        }
        if (reverse && subIndex === 0) {
          setReverse(false);
          setTechIndex((prev) => (prev + 1) % techStack.length);
          return;
        }
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? 50 : 120
    );
    return () => clearTimeout(timeout);
  }, [subIndex, reverse, techIndex]);

  /* Smooth Scroll */
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  /* Classes */
  const socialIconProps =
    "text-2xl md:text-3xl transition-all duration-300 transform hover:scale-125";
  const iconLinkProps =
    "hover:drop-shadow-[0_0_15px_rgba(0,255,255,0.8)] hover:text-cyan-400";

  return (
    <section
      id="home"
      className={`relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e] text-white"
          : "bg-gradient-to-br from-[#f5f5ff] via-[#e8f0ff] to-[#dfe9ff] text-gray-900"
      }`}
    >
      {/* === Thematic Glow Orbs === */}
      <div className="absolute inset-0 overflow-hidden">
        <GlowOrb
          position="-top-20 left-1/4"
          color="bg-cyan-400/40"
          size="w-56 h-56 sm:w-72 sm:h-72"
          blur="blur-[120px] sm:blur-[150px]"
        />
        <GlowOrb
          position="bottom-10 right-1/4"
          color="bg-fuchsia-500/30"
          size="w-72 h-72 sm:w-96 sm:h-96"
          blur="blur-[150px] sm:blur-[200px]"
          delay="2s"
        />
        <GlowOrb
          position="top-1/2 right-[10%]"
          color="bg-blue-500/30"
          size="w-48 h-48 sm:w-56 sm:h-56"
          blur="blur-[120px] sm:blur-[160px]"
          delay="4s"
        />
      </div>

      {/* === Main Hero Content === */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col gap-5 md:gap-8 px-6"
      >
        {/* Name */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight font-mono bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.3 }}
        >
          Yash Sheorey
        </motion.h1>

        {/* Dynamic Role */}
        <motion.h2
          key={roleIndex}
          className={`text-2xl md:text-4xl font-semibold tracking-wide ${
            darkMode ? "text-cyan-300" : "text-fuchsia-600"
          } min-h-[2.5rem]`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {roles[roleIndex]}
        </motion.h2>

        {/* Typing Effect for Tech Stack */}
        <h3
          className={`text-lg sm:text-xl md:text-2xl ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } h-10`}
        >
          {techStack[techIndex].substring(0, subIndex)}
          <span
            className={`border-r-2 ml-1 animate-pulse ${
              darkMode ? "border-cyan-300" : "border-fuchsia-500"
            }`}
          ></span>
        </h3>

        {/* Social Links */}
        <motion.div
          className="flex gap-5 sm:gap-6 justify-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          {socials.map(({ icon, href, label }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`${iconLinkProps} ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span className={socialIconProps}>{icon}</span>
            </a>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className={`max-w-2xl mx-auto leading-relaxed mt-4 text-base md:text-lg ${
            darkMode ? "text-gray-300" : "text-gray-700"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          I craft futuristic digital experiences blending aesthetics,
          intelligence, and performance. Let’s build something extraordinary
          together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <button
            onClick={scrollToProjects}
            className={`w-full sm:w-auto px-6 py-3 sm:px-8 rounded-full font-bold uppercase tracking-wider hover:scale-[1.05] transition-all duration-300 shadow-[0_0_35px_rgba(0,255,255,0.4)] ${
              darkMode
                ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:shadow-[0_0_45px_rgba(255,0,255,0.6)]"
                : "bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white"
            }`}
          >
            Explore Projects
          </button>
          <button
            className={`w-full sm:w-auto px-6 py-3 sm:px-8 rounded-full font-semibold border hover:scale-[1.05] transition-all duration-300 ${
              darkMode
                ? "border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
                : "border-fuchsia-500 text-fuchsia-600 hover:bg-fuchsia-200/40"
            }`}
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Floating Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <FaCode
          className={`absolute left-4 top-24 sm:left-20 sm:top-40 text-4xl sm:text-5xl animate-float ${
            darkMode ? "text-cyan-400/20" : "text-fuchsia-500/20"
          }`}
        />
        <FaBrain
          className={`absolute right-4 top-32 sm:right-28 text-3xl sm:text-4xl animate-float-slow ${
            darkMode ? "text-fuchsia-400/20" : "text-cyan-500/20"
          }`}
        />
        <FaSatellite
          className={`absolute left-1/3 bottom-24 sm:right-1/3 sm:bottom-20 text-4xl sm:text-5xl animate-float ${
            darkMode ? "text-violet-400/20" : "text-indigo-500/20"
          }`}
        />
      </motion.div>

      {/* Scroll Down Icon */}
      <motion.div
        className="absolute bottom-6 cursor-pointer transition-colors duration-300 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        onClick={scrollToProjects}
      >
        <FiArrowDownCircle
          className={`animate-bounce w-9 h-9 sm:w-10 sm:h-10 ${
            darkMode
              ? "text-cyan-400 hover:text-fuchsia-400"
              : "text-fuchsia-600 hover:text-cyan-500"
          }`}
        />
      </motion.div>
    </section>
  );
};

export default MVPsection;
