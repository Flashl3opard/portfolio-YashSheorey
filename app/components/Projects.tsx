"use client";

import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { useTheme } from "./ThemeContext";

// Project Type
interface Project {
  name: string;
  desc: string;
  link: string;
  tag: string;
  color: "cyan" | "fuchsia" | "violet" | "teal";
  image?: string; // <-- added
}

// Projects with images
const projects: Project[] = [
  {
    name: "OjasAI Platform",
    desc: "AI-powered platform for text & image generation. Built with Next.js, OpenAI APIs, SSE, and Vercel.",
    link: "https://github.com/Flashl3opard/OjasAI",
    tag: "Next.js | OpenAI | AI",
    color: "fuchsia",
    image: "/images/ojas.png",
  },
  {
    name: "VibeXCode",
    desc: "Real-time collaborative developer platform with chat, snippets, Appwrite, and Next.js.",
    link: "https://github.com/Flashl3opard/vibexcode",
    tag: "AI | Appwrite | Next.js",
    color: "cyan",
    image: "/images/vibe.png",
  },
  {
    name: "Washify",
    desc: "Full-stack laundry service platform with scheduling, authentication & MongoDB.",
    link: "https://github.com/Flashl3opard/washify",
    tag: "Next.js | MongoDB | Full Stack",
    color: "violet",
  },
  {
    name: "Cosmic Portfolio",
    desc: "Modern animated developer portfolio built using Next.js & Framer Motion.",
    link: "https://github.com/Flashl3opard/cosmic-portfolio",
    tag: "React | Framer Motion | UI/UX",
    color: "teal",
  },
  {
    name: "Abhikalpan (Mockup)",
    desc: "High-end landing page mock-up focusing on premium aesthetics and animation flow.",
    link: "https://github.com/Flashl3opard/abhikalpan-mock",
    tag: "React | UI/UX | Animation",
    color: "fuchsia",
  },
  {
    name: "Bug-Tracking App",
    desc: "Smart bug tracker dashboard with roles, real-time updates and Firebase sync.",
    link: "https://github.com/Flashl3opard/bug-tracker",
    tag: "Next.js | Firebase | Dashboard",
    color: "cyan",
  },
];

const colorMap = {
  cyan: "from-cyan-500 to-cyan-700",
  fuchsia: "from-fuchsia-500 to-fuchsia-700",
  violet: "from-violet-500 to-violet-700",
  teal: "from-teal-500 to-teal-700",
};

const Projects: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="projects"
      className={`relative w-full py-24 md:py-32 transition-colors duration-500 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-12 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        My Cosmic Creations
      </motion.h2>

      {/* MOBILE → HORIZONTAL SCROLL SLIDER */}
      <div className="md:hidden w-full overflow-x-auto px-4 scroll-smooth snap-x snap-mandatory no-scrollbar">
        <div className="flex gap-6 pb-6">
          {projects.map((p, i) => (
            <motion.a
              key={i}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`min-w-[85%] snap-center rounded-xl overflow-hidden shadow-xl transition-all bg-white/10 border backdrop-blur-lg ${
                darkMode
                  ? "border-white/10"
                  : "bg-white shadow-md border-gray-200"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              {/* IMAGE */}
              {p.image ? (
                <Image
                  src={p.image}
                  width={500}
                  height={300}
                  alt={p.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div
                  className={`w-full h-48 bg-gradient-to-br ${
                    colorMap[p.color]
                  } opacity-70`}
                />
              )}

              {/* Content */}
              <div className="p-5">
                <h3
                  className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400`}
                >
                  {p.name}
                </h3>

                <p
                  className={`text-sm mt-1 mb-3 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {p.desc}
                </p>

                <span
                  className={`inline-block px-3 py-1 text-xs rounded-full border ${
                    darkMode
                      ? "border-cyan-300 text-cyan-300"
                      : "border-cyan-600 text-cyan-700"
                  }`}
                >
                  {p.tag}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* DESKTOP GRID */}
      <div className="hidden md:grid grid-cols-3 gap-10 max-w-7xl mx-auto px-6">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group rounded-xl overflow-hidden shadow-lg border transition-all hover:shadow-2xl ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white backdrop-blur-sm border-gray-200"
            }`}
            whileHover={{ scale: 1.03 }}
          >
            {/* image */}
            {p.image ? (
              <Image
                src={p.image}
                width={600}
                height={350}
                alt={p.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div
                className={`w-full h-48 bg-gradient-to-br ${colorMap[p.color]}`}
              />
            )}

            <div className="p-6">
              <h3
                className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300`}
              >
                {p.name}
              </h3>
              <p
                className={`text-sm mt-2 mb-4 ${
                  darkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {p.desc}
              </p>
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full border ${
                  darkMode
                    ? "border-fuchsia-300 text-fuchsia-300"
                    : "border-fuchsia-600 text-fuchsia-600"
                }`}
              >
                {p.tag}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
