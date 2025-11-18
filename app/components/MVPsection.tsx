"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";
import { FiArrowDownCircle, FiExternalLink } from "react-icons/fi";
import {
  FaCode,
  FaBrain,
  FaSatellite,
  FaGithub,
  FaLinkedinIn,
  FaDiscord,
  FaTwitter,
  FaReact,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";

/**
 * ----------------------------------------------------------------------------
 * UPGRADED HERO SECTION
 * Features: 3D Mouse Tilt, Floating Particles, Liquid Gradients, Staggered Text
 * ----------------------------------------------------------------------------
 */

/* ------------------------------ Data ------------------------------ */
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

/* ------------------------------ Helpers ------------------------------ */
const useCycleIndex = (len: number, ms = 3500) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return [idx, setIdx] as const;
};

// 3D Tilt Card Component
const TiltCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 40 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 40 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ------------------------------ Main Component ------------------------------ */
const MVPsection: React.FC = () => {
  const { darkMode } = useTheme();

  // Role Rotation
  const [roleIndex] = useCycleIndex(roles.length, 3500);

  // Typing Logic
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
      className={`relative w-full min-h-screen flex items-center overflow-hidden transition-colors duration-700 ${
        darkMode
          ? "bg-[#050510] text-white"
          : "bg-gradient-to-br from-white via-blue-50 to-indigo-50 text-slate-900"
      }`}
    >
      {/* --- BACKGROUND ANIMATIONS --- */}

      {/* Grid Background */}
      <div
        className={`absolute inset-0 z-0 ${
          darkMode ? "opacity-20" : "opacity-40"
        }`}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Moving Ambient Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[128px] pointer-events-none"
      />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT: TEXT COLUMN */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
          >
            {/* Badge */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border ${
                darkMode
                  ? "bg-cyan-950/30 border-cyan-500/30 text-cyan-300"
                  : "bg-blue-50 border-blue-200 text-blue-700"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              Hi, I&apos;m Yash
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              <span className="block">Yash Sheorey</span>
              <span
                className={`block text-3xl md:text-4xl mt-2 font-semibold ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Building{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
                  Futuristic Digital
                </span>{" "}
                Experiences
              </span>
            </motion.h1>

            {/* Animated Role */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="h-8 mt-4 overflow-hidden"
            >
              <motion.div
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`text-xl font-mono ${
                  darkMode ? "text-cyan-200" : "text-blue-600"
                }`}
              >
                &gt; {roles[roleIndex]}_
              </motion.div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`mt-6 text-lg leading-relaxed max-w-xl ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              I craft fast, accessible, production-ready web apps. Combining
              beautiful UI, robust backend systems, and a touch of AI to solve
              real-world problems.
            </motion.p>

            {/* Tech Stack Typing */}
            <motion.div
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              className="mt-6 flex items-center gap-2 text-sm md:text-base font-mono"
            >
              <span className={darkMode ? "text-gray-500" : "text-gray-400"}>
                const stack =
              </span>
              <span className={darkMode ? "text-yellow-300" : "text-amber-600"}>
                &quot;{techStack[techIndex].substring(0, subIndex)}&quot;
              </span>
              <span
                className={`w-[2px] h-5 ${
                  darkMode ? "bg-white" : "bg-black"
                } animate-blink`}
              />
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToProjects}
                className={`group relative px-8 py-4 rounded-full font-bold overflow-hidden transition-all hover:scale-105 ${
                  darkMode
                    ? "bg-white text-black"
                    : "bg-slate-900 text-white shadow-xl shadow-blue-200"
                }`}
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                <span className="flex items-center gap-2">
                  Explore Projects <FiArrowDownCircle />
                </span>
              </button>

              <div className="flex items-center gap-4 pl-4">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-2xl transition-transform hover:-translate-y-1 hover:scale-110 ${
                      darkMode
                        ? "text-gray-400 hover:text-white"
                        : "text-slate-400 hover:text-blue-600"
                    }`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: 3D VISUALS */}
        <div className="lg:col-span-5 relative perspective-1000">
          {/* 3D Floating Icons (Behind) */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-12 -right-12 text-6xl opacity-20 z-0 ${
              darkMode ? "text-cyan-400" : "text-blue-400"
            }`}
          >
            <FaReact />
          </motion.div>

          <motion.div
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute bottom-0 -left-12 text-5xl opacity-20 z-0 ${
              darkMode ? "text-purple-400" : "text-violet-400"
            }`}
          >
            <FaBrain />
          </motion.div>

          {/* THE 3D CARD */}
          <TiltCard className="relative z-10 w-full">
            <div
              className={`relative rounded-3xl p-[1px] overflow-hidden group ${
                darkMode
                  ? "bg-gradient-to-br from-cyan-500/50 via-purple-500/50 to-transparent"
                  : "bg-gradient-to-br from-blue-500 via-indigo-500 to-transparent"
              }`}
            >
              {/* Inner Card Background */}
              <div
                className={`relative rounded-[23px] h-full p-6 md:p-8 backdrop-blur-xl ${
                  darkMode ? "bg-black/80" : "bg-white/90"
                }`}
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-xl ${
                        darkMode
                          ? "bg-cyan-500/20 text-cyan-300"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <FaCode size={24} />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-lg ${
                          darkMode ? "text-white" : "text-slate-800"
                        }`}
                      >
                        VibeXCode
                      </h3>
                      <p
                        className={`text-xs font-mono ${
                          darkMode ? "text-gray-400" : "text-slate-500"
                        }`}
                      >
                        Dev Collaboration Hub
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/80" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
                    <div className="w-2 h-2 rounded-full bg-green-500/80" />
                  </div>
                </div>

                {/* Code Snippet Visual */}
                <div
                  className={`rounded-lg p-4 mb-6 font-mono text-xs leading-5 overflow-hidden relative ${
                    darkMode
                      ? "bg-gray-900/50 text-gray-300"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-400 to-purple-500" />
                  <p>
                    <span className="text-purple-400">const</span> project ={" "}
                    <span className="text-yellow-400">new</span> Future();
                  </p>
                  <p>
                    project.<span className="text-blue-400">integrate</span>
                    (AI);
                  </p>
                  <p>
                    project.<span className="text-blue-400">deploy</span>(
                    <span className="text-green-400">
                      &quot;Production&quot;
                    </span>
                    );
                  </p>
                  <div className="mt-2 opacity-50">
                    // AI-powered developer hub with chat & snippets.
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Next.js", "Appwrite", "Realtime"].map((tag) => (
                    <span
                      key={tag}
                      className={`px-3 py-1 rounded-md text-xs font-semibold border ${
                        darkMode
                          ? "border-white/10 bg-white/5 text-gray-300"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Area */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-500/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] ${
                          darkMode
                            ? "border-black bg-gray-800"
                            : "border-white bg-gray-200"
                        }`}
                      >
                        Dev
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://github.com/Flashl3opard/vibexcode"
                    className={`flex items-center gap-2 text-sm font-bold transition-colors ${
                      darkMode
                        ? "text-cyan-400 hover:text-cyan-300"
                        : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    View Code <FiExternalLink />
                  </a>
                </div>
              </div>
            </div>

            {/* Floating Elements connected to card */}
            <motion.div
              style={{ z: 50 }}
              className="absolute -right-6 top-10 p-3 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 text-white transform translate-z-20"
            >
              <FaSatellite className="text-xl" />
            </motion.div>
            <motion.div
              style={{ z: 30 }}
              className={`absolute -left-4 bottom-20 px-4 py-2 rounded-lg shadow-lg text-sm font-bold transform -translate-z-10 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-slate-900"
              }`}
            >
              🚀 Live Demo
            </motion.div>
          </TiltCard>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 2, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
      >
        <FiArrowDownCircle
          className={`text-3xl ${
            darkMode ? "text-gray-600" : "text-slate-300"
          }`}
        />
      </motion.div>

      {/* Custom Styles for animations not in Tailwind */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </section>
  );
};

export default MVPsection;
