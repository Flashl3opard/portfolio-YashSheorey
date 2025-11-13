"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

// ---------------- Expertise Data ----------------
const expertise = [
  {
    id: 1,
    icon: "M6 22l6-4 6 4V4a2 2 0 00-2-2H8a2 2 0 00-2 2v18z",
    title: "Frontend Mastery",
    description:
      "Building fast, accessible, and responsive UIs with React, Next.js, Tailwind, and modern state management.",
    color: "cyan",
  },
  {
    id: 2,
    icon: "M12 21.5V10M17 14.5l-5-5-5 5M17 19H7a4 4 0 010-8h10a4 4 0 010 8z",
    title: "Full Stack Integration",
    description:
      "Designing robust REST APIs and managing databases with Node.js, Express, and NoSQL systems.",
    color: "fuchsia",
  },
  {
    id: 3,
    icon: "M2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6M12 2v11M16 6l-4 4-4-4",
    title: "IoT & Edge Computing",
    description:
      "Connecting devices with embedded C/C++, MQTT, ESP systems, and real-time cloud data streaming.",
    color: "violet",
  },
] as const;

// ---------------- Color Map ----------------
const colorMap = {
  cyan: {
    text: "text-cyan-500",
    border: "border-cyan-500/30",
  },
  fuchsia: {
    text: "text-fuchsia-500",
    border: "border-fuchsia-500/30",
  },
  violet: {
    text: "text-violet-500",
    border: "border-violet-500/30",
  },
};

// ---------------- SVG ICON COMPONENT ----------------
interface IconProps {
  path: string;
  color: keyof typeof colorMap;
}

const CustomIcon: React.FC<IconProps> = ({ path, color }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-10 h-10 md:w-12 md:h-12 ${colorMap[color].text}`}
  >
    <path d={path} />
  </svg>
);

// ---------------- ABOUT SECTION ----------------
const About: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="about"
      className={`relative w-full py-24 md:py-32 flex flex-col items-center px-4 md:px-6 transition-colors duration-500 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* -------- Header -------- */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* -------- Main Card -------- */}
      <motion.div
        className={`max-w-5xl backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-xl transition-shadow duration-300 ${
          darkMode
            ? "bg-white/5 border border-white/20"
            : "bg-white/80 border border-gray-300"
        }`}
        initial={{ opacity: 0, scale: 0.93 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* -------- Bio -------- */}
        <div
          className={`text-lg md:text-xl leading-relaxed mb-12 text-center ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <p className="mb-4">
            I&apos;m{" "}
            <span
              className={`font-bold ${
                darkMode ? "text-cyan-400" : "text-cyan-600"
              }`}
            >
              Yash Sheorey
            </span>
            , a developer blending{" "}
            <span className="text-cyan-500 font-semibold">futuristic UI</span>{" "}
            with{" "}
            <span className="text-fuchsia-500 font-semibold">
              high-performance engineering
            </span>
            .
          </p>

          <p>
            I craft scalable, visually immersive, and interactive experiences —
            everything from smooth 3D animations to backend-driven logic. My
            focus is turning futuristic ideas into polished digital products.
          </p>
        </div>

        {/* -------- Resume Button -------- */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/resume.pdf"
            download
            className="group flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold uppercase text-sm tracking-wider hover:scale-[1.05] transition-all duration-300 shadow-lg"
          >
            <FaDownload className="text-lg group-hover:animate-pulse" />
            Download Resume
          </a>
        </motion.div>

        {/* -------- Expertise Section -------- */}
        <h3 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
          Core Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              className={`p-6 rounded-2xl border ${
                colorMap[item.color].border
              } transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl hover:scale-105 ${
                darkMode
                  ? "bg-white/5 text-gray-200"
                  : "bg-gray-100 text-gray-800"
              }`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="flex flex-col items-center">
                <CustomIcon path={item.icon} color={item.color} />
                <h4 className="mt-4 text-xl font-semibold mb-2 text-center">
                  {item.title}
                </h4>
                <p className="text-sm text-center">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
