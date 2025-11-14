"use client";

import React, { useEffect, useState } from "react";
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
import { useTheme } from "./ThemeContext";

/**
 * Layout 2 — Left-Aligned Hero (Blue Professional light theme)
 *
 * Features:
 * - Left text column (name, role, typing tech, CTA)
 * - Right visual column with stacked cards + glow orbs
 * - Improved light-mode palette (blue / cyan / violet)
 * - Fully responsive (collapses into single column on small screens)
 * - Smooth Framer Motion entry animations
 * - Accessible buttons & links
 * - Typing and rotating role animations preserved
 */

/* ------------------------------ content ------------------------------ */
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

/* ------------------------------ small helpers ------------------------------ */
const socialIconProps =
  "text-2xl md:text-3xl transition-all duration-300 transform hover:scale-110";
const iconLinkProps =
  "inline-flex items-center justify-center w-10 h-10 rounded-full";

const useCycleIndex = (len: number, ms = 3500) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return [idx, setIdx] as const;
};

/* ------------------------------ component ------------------------------ */
const MVPsection: React.FC = () => {
  const { darkMode } = useTheme();

  // role cycle
  const [roleIndex] = useCycleIndex(roles.length, 3500);

  // typing effect for tech stack
  const [techIndex, setTechIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    const speed = reverse ? 50 : 110;
    const t = setTimeout(() => {
      const current = techStack[techIndex];
      if (!reverse && subIndex >= current.length) {
        setReverse(true);
        return;
      }
      if (reverse && subIndex <= 0) {
        setReverse(false);
        setTechIndex((p) => (p + 1) % techStack.length);
        return;
      }
      setSubIndex((p) => p + (reverse ? -1 : 1));
    }, speed);
    return () => clearTimeout(t);
  }, [subIndex, reverse, techIndex]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className={`w-full min-h-screen flex items-center py-16 px-6 md:px-12 transition-all duration-700 ${
        darkMode
          ? "bg-gradient-to-br from-[#050510] via-[#07102a] to-[#07142e] text-white"
          : "bg-gradient-to-br from-[#f8fbff] via-[#eef6ff] to-[#e7f0ff] text-slate-900"
      }`}
    >
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: TEXT */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p
              className={`inline-block text-sm font-medium mb-2 rounded-full px-3 py-1 ${
                darkMode
                  ? "bg-white/6 text-cyan-300"
                  : "bg-cyan-100 text-cyan-700"
              }`}
            >
              Hi, I'm Yash 👋
            </p>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              <span className="block">Yash Sheorey</span>
              <span
                className={`block mt-2 text-2xl md:text-3xl font-semibold ${
                  darkMode ? "text-cyan-200/90" : "text-slate-700"
                }`}
              >
                <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-violet-500">
                  Building modern web experiences
                </span>
              </span>
            </h1>

            <div className="mt-6 max-w-xl">
              <h2
                className={`text-lg md:text-xl mb-2 font-semibold ${
                  darkMode ? "text-gray-300" : "text-slate-700"
                }`}
              >
                {roles[roleIndex]}
              </h2>

              <p
                className={`text-sm md:text-base leading-relaxed ${
                  darkMode ? "text-gray-400" : "text-slate-600"
                }`}
              >
                I craft fast, accessible, production-ready web apps — combining
                beautiful UI, robust backend systems, and a touch of AI.
              </p>

              {/* typing tech */}
              <div className="mt-4 flex items-center gap-2">
                <span
                  className={`text-sm md:text-base ${
                    darkMode ? "text-gray-300" : "text-slate-700"
                  }`}
                >
                  Working with
                </span>
                <span className="font-medium text-sm md:text-base">
                  <span
                    className={`inline-block ${
                      darkMode ? "text-cyan-300" : "text-blue-600"
                    }`}
                  >
                    {techStack[techIndex].substring(0, subIndex)}
                  </span>
                  <span
                    className={`ml-2 h-5 w-px animate-pulse ${
                      darkMode ? "bg-cyan-300" : "bg-blue-600"
                    }`}
                  />
                </span>
              </div>

              {/* Socials */}
              <div className="mt-6 flex items-center gap-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                    className={`${iconLinkProps} ${
                      darkMode
                        ? "bg-white/6 text-gray-200 hover:bg-white/10"
                        : "bg-white shadow-sm text-slate-700 hover:shadow-md"
                    }`}
                  >
                    <span className={socialIconProps}>{s.icon}</span>
                  </a>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={scrollToProjects}
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-transform duration-200 ${
                    darkMode
                      ? "bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white shadow-[0_8px_30px_rgba(0,255,255,0.08)] hover:scale-[1.02]"
                      : "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:shadow-lg hover:scale-[1.02]"
                  }`}
                >
                  Explore Projects
                </button>

                <a
                  href="#contact"
                  className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-medium border transition-colors duration-200 ${
                    darkMode
                      ? "border-cyan-400 text-cyan-300 hover:bg-cyan-400/10"
                      : "border-blue-200 text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: VISUALS */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full max-w-md relative"
          >
            {/* Orbs behind */}
            <div
              className="absolute -left-10 -top-10 w-40 h-40 rounded-full blur-[90px] opacity-40 pointer-events-none"
              style={{
                background: darkMode
                  ? "radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(139,92,246,0.12) 50%)"
                  : "radial-gradient(circle, rgba(59,130,246,0.22) 0%, rgba(139,92,246,0.12) 50%)",
              }}
            />

            <div
              className="absolute right-0 top-12 w-56 h-56 rounded-full blur-[120px] opacity-30 pointer-events-none"
              style={{
                background: darkMode
                  ? "radial-gradient(circle, rgba(139,92,246,0.18) 0%, rgba(6,182,212,0.08) 60%)"
                  : "radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(14,165,233,0.08) 60%)",
              }}
            />

            {/* Card stack */}
            <div
              className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-black/40 to-white/3 border border-white/6"
                  : "bg-white/90 border border-gray-100"
              }`}
            >
              {/* top small badge */}
              <div
                className={`px-4 py-2 flex items-center justify-between ${
                  darkMode ? "bg-black/20" : "bg-white/95"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      darkMode ? "bg-cyan-400" : "bg-blue-500"
                    }`}
                  />
                  <div
                    className={`${
                      darkMode ? "text-gray-300" : "text-slate-800"
                    } font-semibold`}
                  >
                    Featured Project
                  </div>
                </div>
                <div className="text-xs text-gray-400">Live</div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-bold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  VibeXCode — Dev Hub
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    darkMode ? "text-gray-300" : "text-slate-600"
                  }`}
                >
                  AI-powered developer hub with chat, snippets, and cloud
                  storage. Built with Next.js, Appwrite & realtime messaging.
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="https://github.com/Flashl3opard/vibexcode"
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      darkMode
                        ? "bg-white/6 text-white/90"
                        : "bg-gray-100 text-slate-800"
                    }`}
                  >
                    <FaGithub /> View
                  </a>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      darkMode
                        ? "bg-white/4 text-gray-300"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    Next.js
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      darkMode
                        ? "bg-white/4 text-gray-300"
                        : "bg-purple-50 text-violet-600"
                    }`}
                  >
                    Appwrite
                  </span>
                </div>
              </div>

              {/* Lower card preview */}
              <div className="p-4 border-t border-t-gray-100/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-md ${
                      darkMode ? "bg-white/6" : "bg-slate-100"
                    } flex items-center justify-center`}
                  >
                    <FaCode
                      className={`${
                        darkMode ? "text-cyan-300" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <div
                      className={`${
                        darkMode ? "text-gray-200" : "text-slate-900"
                      } font-semibold`}
                    >
                      Cosmic Portfolio
                    </div>
                    <div
                      className={`text-xs ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      React · Framer Motion · Tailwind
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/Flashl3opard"
                    target="_blank"
                    rel="noreferrer"
                    className={`${
                      darkMode ? "text-cyan-300" : "text-blue-600"
                    } hover:underline`}
                  >
                    View Repos
                  </a>
                </div>
              </div>
            </div>

            {/* small floating icons around card */}
            <div className="pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <FaSatellite
                  className={`absolute -right-6 -bottom-6 text-3xl ${
                    darkMode ? "text-violet-400/20" : "text-indigo-500/20"
                  }`}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <FaBrain
                  className={`absolute -left-10 -bottom-10 text-2xl ${
                    darkMode ? "text-fuchsia-400/20" : "text-cyan-500/20"
                  }`}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* scroll down CTA (centered bottom on mobile, right aligned on wide) */}
      <div className="fixed left-1/2 -translate-x-1/2 bottom-8 z-40 lg:left-auto lg:right-12 lg:translate-x-0">
        <motion.button
          onClick={scrollToProjects}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={`flex items-center gap-2 px-3 py-2 rounded-full ${
            darkMode
              ? "bg-white/6 text-cyan-300"
              : "bg-white shadow text-blue-600"
          } hover:scale-105 transition-transform`}
          aria-label="Scroll to projects"
        >
          <FiArrowDownCircle className="w-6 h-6" />
          <span className="hidden lg:inline text-sm">See projects</span>
        </motion.button>
      </div>
    </section>
  );
};

export default MVPsection;
