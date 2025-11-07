"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

// Expertise data
const expertise = [
  {
    id: 1,
    icon: "M6 22l6-4 6 4V4a2 2 0 00-2-2H8a2 2 0 00-2 2v18z",
    title: "Frontend Mastery",
    description:
      "Building fast, accessible, and responsive UIs with React, Next.js, Tailwind, and state management libraries.",
    color: "cyan",
  },
  {
    id: 2,
    icon: "M12 21.5V10M17 14.5l-5-5-5 5M17 19H7a4 4 0 010-8h10a4 4 0 010 8z",
    title: "Full Stack Integration",
    description:
      "Designing robust RESTful APIs and managing databases with Node.js, Express, and modern NoSQL solutions.",
    color: "fuchsia",
  },
  {
    id: 3,
    icon: "M2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6M12 2v11M16 6l-4 4-4-4",
    title: "IoT & Edge Computing",
    description:
      "Bridging the physical and digital world with C/C++, MQTT, and real-time data streaming for connected devices.",
    color: "violet",
  },
];

// Color map for proper Tailwind classes
const colorMap = {
  cyan: {
    text: "text-cyan-500",
    border: "border-cyan-500/30",
    shadow: "hover:shadow-cyan-400/40",
  },
  fuchsia: {
    text: "text-fuchsia-500",
    border: "border-fuchsia-500/30",
    shadow: "hover:shadow-fuchsia-400/40",
  },
  violet: {
    text: "text-violet-500",
    border: "border-violet-500/30",
    shadow: "hover:shadow-violet-400/40",
  },
};

// Inline SVG renderer
const CustomIcon = ({
  path,
  color,
}: {
  path: string;
  color: keyof typeof colorMap;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-10 h-10 md:w-12 md:h-12 ${colorMap[color].text} drop-shadow-[0_0_12px_rgba(0,255,255,0.25)]`}
  >
    <path d={path} />
  </svg>
);

const About = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="about"
      className={`relative w-full py-24 md:py-32 flex flex-col items-center px-4 md:px-6 z-10 transition-colors duration-500 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* 🌟 Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)] text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* 🌌 Main Glass Card */}
      <motion.div
        className={`relative z-10 max-w-5xl backdrop-blur-xl rounded-3xl p-6 md:p-12 shadow-[0_0_30px_rgba(0,255,255,0.1)] hover:shadow-[0_0_50px_rgba(0,255,255,0.3)] transition-shadow duration-300 ${
          darkMode
            ? "bg-white/5 border border-white/20"
            : "bg-white/70 border border-gray-300"
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Bio Summary */}
        <div
          className={`text-lg md:text-xl leading-relaxed mb-8 text-center ${
            darkMode ? "text-gray-200" : "text-gray-700"
          }`}
        >
          <p className="mb-4">
            I'm{" "}
            <span
              className={
                darkMode ? "text-cyan-400 font-bold" : "text-cyan-600 font-bold"
              }
            >
              Yash Sheorey
            </span>
            , a passionate creator at the intersection of{" "}
            <span className={darkMode ? "text-cyan-400" : "text-cyan-600"}>
              futuristic UI design
            </span>{" "}
            and{" "}
            <span
              className={darkMode ? "text-fuchsia-400" : "text-fuchsia-600"}
            >
              high-performance software engineering
            </span>
            .
          </p>
          <p>
            My mission is to architect digital experiences that are not only
            visually stunning but also scalable, performant, and delightful to
            use. I thrive on turning complex ideas into elegant and interactive
            solutions, from animations to robust backend integrations.
          </p>
        </div>

        {/* --- DOWNLOAD RESUME BUTTON --- */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <a
            href="/path/to/your/resume.pdf"
            download
            className="group flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold uppercase text-sm tracking-wider hover:scale-[1.05] transition-all duration-300 shadow-[0_0_20px_rgba(255,0,255,0.4)] hover:shadow-[0_0_30px_rgba(255,0,255,0.7)]"
          >
            <FaDownload className="text-lg group-hover:animate-pulse" />
            Download Resume (PDF)
          </a>
        </motion.div>
        {/* --- END DOWNLOAD RESUME BUTTON --- */}

        {/* Core Expertise */}
        <h3 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
          Core Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              className={`p-6 rounded-2xl ${
                colorMap[item.color as keyof typeof colorMap].border
              } transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:scale-105 ${
                darkMode
                  ? "bg-white/5 text-gray-200"
                  : "bg-gray-100/80 text-gray-800"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <div className="flex flex-col items-center">
                <CustomIcon
                  path={item.icon}
                  color={item.color as keyof typeof colorMap}
                />
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
