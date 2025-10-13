"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowDownCircle } from "react-icons/fi";
import { FaCode, FaBrain, FaSatellite } from "react-icons/fa";

const roles = [
  "Frontend Developer",
  "Full Stack Developer",
  "AI Enthusiast",
  "Linux Kernel Developer",
];
const techStack = ["React.js", "Next.js", "Express.js", "Tailwind CSS"];

const MVPsection: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [techIndex, setTechIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect for tech stack
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
      reverse ? 50 : 150
    );

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, techIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e] text-white"
    >
      {/* 🔮 Floating Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-72 h-72 bg-cyan-500/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-fuchsia-500/30 rounded-full blur-[150px] animate-pulse delay-3000"></div>
      </div>

      {/* 🌟 Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="z-10 flex flex-col gap-4 md:gap-6"
      >
        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight font-mono bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          Yash Sheorey
        </motion.h1>

        {/* Role */}
        <motion.h2
          key={roleIndex}
          className="text-2xl md:text-3xl font-light tracking-wide text-cyan-300 min-h-[2.5rem]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {roles[roleIndex]}
        </motion.h2>

        {/* Typing Tech Stack */}
        <h3 className="text-xl md:text-2xl text-gray-300 h-10">
          {techStack[techIndex].substring(0, subIndex)}
          <span className="border-r-2 border-cyan-300 ml-1 animate-pulse"></span>
        </h3>

        <motion.p
          className="max-w-2xl text-gray-300 text-base md:text-lg mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          I craft futuristic digital experiences blending aesthetics,
          intelligence, and performance. Let’s build something extraordinary
          together.
        </motion.p>

        {/* ✨ Buttons */}
        <motion.div
          className="flex gap-6 justify-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <button className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_25px_rgba(0,255,255,0.3)]">
            Explore Projects
          </button>
          <button className="px-6 py-3 rounded-full border border-cyan-400 text-cyan-300 hover:bg-cyan-400/10 hover:scale-105 transition-all duration-300">
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* 🚀 Floating Icons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute inset-0 flex justify-center items-center pointer-events-none"
      >
        <FaCode className="absolute left-20 top-40 text-cyan-400/40 text-5xl animate-float" />
        <FaBrain className="absolute right-28 top-32 text-fuchsia-400/40 text-4xl animate-float-slow" />
        <FaSatellite className="absolute right-1/3 bottom-20 text-violet-400/40 text-5xl animate-float" />
      </motion.div>

      {/* ⬇️ Scroll Down Icon */}
      <motion.div
        className="absolute bottom-10 cursor-pointer text-cyan-400 hover:text-fuchsia-400 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <FiArrowDownCircle size={36} className="animate-bounce" />
      </motion.div>
    </section>
  );
};

export default MVPsection;
