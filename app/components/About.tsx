"use client";
import React from "react";
import { motion } from "framer-motion";

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

// Helper component to render an icon using inline SVG
const CustomIcon = ({ path, color }: { path: string; color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-10 h-10 md:w-12 md:h-12 text-${color}-400 drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]`}
  >
    <path d={path} />
  </svg>
);

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 flex flex-col items-center px-4 md:px-6 z-10"
    >
      {/* 🌟 Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)] text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* 🌌 Main Glass Card */}
      <motion.div
        className="relative z-10 max-w-5xl bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-12 shadow-[0_0_40px_rgba(0,255,255,0.15)] hover:shadow-[0_0_60px_rgba(0,255,255,0.25)] transition-shadow duration-300"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Bio Summary */}
        <div className="text-gray-200 text-lg md:text-xl leading-relaxed mb-12 text-center">
          <p className="mb-4">
            I’m <span className="text-cyan-400 font-bold">Yash Sheorey</span>, a
            passionate creator at the intersection of{" "}
            <span className="text-cyan-400">futuristic UI design</span> and{" "}
            <span className="text-fuchsia-400">
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

        {/* Core Expertise */}
        <h3 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300">
          Core Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              className={`p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-${item.color}-500/30 transition-all duration-500 cursor-pointer shadow-lg hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 * index, duration: 0.6 }}
            >
              <div className="flex flex-col items-center">
                <CustomIcon path={item.icon} color={item.color} />
                <h4 className="mt-4 text-xl font-semibold text-white mb-2 text-center">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-300 text-center">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
