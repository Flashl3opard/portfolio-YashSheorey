"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaPython,
  FaJs,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiAppwrite,
  SiGo,
  SiExpress,
  SiTypescript,
} from "react-icons/si";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
   Data Config
--------------------------------------------*/
const techSections = [
  {
    title: "Languages",
    color: "from-yellow-400 to-orange-500",
    skills: [
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
      { name: "Python", icon: <FaPython className="text-blue-500" /> },
      { name: "GoLang", icon: <SiGo className="text-cyan-400" /> },
    ],
  },
  {
    title: "Frameworks",
    color: "from-cyan-400 to-blue-500",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "Express.js", icon: <SiExpress className="text-gray-400" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
    ],
  },
  {
    title: "Tools & DB",
    color: "from-emerald-400 to-green-600",
    skills: [
      { name: "MongoDB", icon: <FaDatabase className="text-emerald-400" /> },
      { name: "Appwrite", icon: <SiAppwrite className="text-pink-500" /> },
      { name: "Git", icon: <FaGitAlt className="text-orange-600" /> },
    ],
  },
];

/* -----------------------------------------
   3D Tilt Card Component
--------------------------------------------*/
const TechCard = ({
  icon,
  name,
  darkMode,
  index,
}: {
  icon: React.ReactNode;
  name: string;
  darkMode: boolean;
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1,
      }}
      onMouseMove={handleMouseMove}
      className="group relative w-full"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:scale-[1.02] ${
          darkMode
            ? "bg-white/5 border-white/10 hover:border-white/20"
            : "bg-white/80 border-gray-200 hover:border-blue-300 shadow-lg"
        }`}
      >
        {/* Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                ${
                  darkMode
                    ? "rgba(14, 165, 233, 0.15)"
                    : "rgba(59, 130, 246, 0.15)"
                },
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <span className="text-5xl drop-shadow-lg filter transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            {icon}
          </span>
          <h4
            className={`font-bold text-sm uppercase tracking-wider ${
              darkMode ? "text-gray-300" : "text-slate-700"
            }`}
          >
            {name}
          </h4>
        </div>

        {/* Glowing Border Bottom */}
        <div
          className={`absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
            darkMode
              ? "bg-gradient-to-r from-cyan-500 to-purple-500"
              : "bg-gradient-to-r from-blue-500 to-violet-500"
          }`}
        />
      </div>
    </motion.div>
  );
};

/* -----------------------------------------
   Main Skills Component
--------------------------------------------*/
const Skills = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yLeft = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], [-100, 100]); // Moves opposite
  const yRight = useTransform(scrollYProgress, [0, 1], [150, -150]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className={`relative min-h-screen w-full overflow-hidden py-24 px-6 transition-colors duration-700 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* --- BACKGROUND REACTOR CORE --- */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className={`w-[800px] h-[800px] rounded-full opacity-20 blur-[100px] ${
            darkMode
              ? "bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"
              : "bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-300"
          }`}
        />
        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] ${
            darkMode ? "opacity-30" : "opacity-50"
          }`}
        />
      </div>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-4"
          >
            <span className={darkMode ? "text-white" : "text-slate-900"}>
              TECH
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              ARSENAL
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`text-lg max-w-2xl mx-auto ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            The weapons of choice for building the future.
          </motion.p>
        </div>

        {/* Parallax Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Column 1: Languages */}
          <motion.div style={{ y: yLeft }} className="flex flex-col gap-6">
            <h3
              className={`text-xl font-bold text-center mb-4 ${
                darkMode ? "text-cyan-400" : "text-blue-600"
              }`}
            >
              // Languages
            </h3>
            {techSections[0].skills.map((skill, i) => (
              <TechCard
                key={i}
                index={i}
                darkMode={darkMode}
                icon={skill.icon}
                name={skill.name}
              />
            ))}
          </motion.div>

          {/* Column 2: Frameworks (Moves Reverse) */}
          <motion.div
            style={{ y: yMiddle }}
            className="flex flex-col gap-6 pt-12 md:pt-0"
          >
            <h3
              className={`text-xl font-bold text-center mb-4 ${
                darkMode ? "text-purple-400" : "text-violet-600"
              }`}
            >
              // Frameworks
            </h3>
            {techSections[1].skills.map((skill, i) => (
              <TechCard
                key={i}
                index={i + 2}
                darkMode={darkMode}
                icon={skill.icon}
                name={skill.name}
              />
            ))}
          </motion.div>

          {/* Column 3: Tools */}
          <motion.div style={{ y: yRight }} className="flex flex-col gap-6">
            <h3
              className={`text-xl font-bold text-center mb-4 ${
                darkMode ? "text-emerald-400" : "text-emerald-600"
              }`}
            >
              // Tools & DB
            </h3>
            {techSections[2].skills.map((skill, i) => (
              <TechCard
                key={i}
                index={i + 4}
                darkMode={darkMode}
                icon={skill.icon}
                name={skill.name}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
