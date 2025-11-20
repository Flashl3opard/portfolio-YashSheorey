"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaLaptopCode,
  FaLinux,
  FaBriefcase,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
    Data
--------------------------------------------*/
const experiences = [
  {
    id: 4,
    role: "LFX 2025",
    company: "The Linux Kernel",
    period: "2025",
    desc: "Contributed to the Linux Kernel through the LFX Mentorship program by improving kselftest test cases, fixing documentation issues, and enhancing clarity and consistency across contributor-facing docs.",
    icon: <FaLinux />,
    color: "green",
  },
  {
    // New entry based on user request
    id: 6,
    role: "Dev Team Leader",
    company: "Tarang'25 Project",
    period: "2025",
    desc: "Led the Web Development team for Tarang’25, the largest cultural fest in Central India, architecting a fast, scalable event website with modern frameworks and high user traffic optimization.",
    icon: <FaBriefcase />,
    color: "violet", // Using violet as a new distinct color
  },
  {
    id: 3,
    role: "IoT and Autonomous Drone Engineer",
    company: "Auto-Drone Comp",
    period: "2024",
    desc: "Designed and engineered an autonomous quadcopter system for a national-level drone competition, implementing manual mapping workflows, navigation logic, and real-time sensor integration for stable flight performance.",
    icon: <FaCode />,
    color: "violet", // Reusing violet, though it might be good to change for timeline clarity
  },
  {
    id: 1,
    role: "Freelance Full Stack Dev",
    company: "Holiday Booking Platform",
    period: "2025 - Present",
    desc: "Architecting a high-scale booking engine. Orchestrating Next.js microservices, optimizing MongoDB aggregation pipelines, and ensuring 99.9% uptime.",
    icon: <FaLaptopCode />,
    color: "cyan",
  },
  {
    id: 2,
    role: "Founder & Lead Dev",
    company: "VibeXCode AI Hub",
    period: "2025",
    desc: "Bootstrapped an AI-native dev ecosystem. Built real-time collaboration engines with WebSockets and integrated LLMs for code generation.",
    icon: <FaRocket />,
    color: "fuchsia",
  },
  {
    id: 5,
    role: "Frontend Architect",
    company: "Freelance & Projects",
    period: "2023 - 2025",
    desc: "Crafting pixel-perfect, motion-rich interfaces. Specializing in WebGL integrations, Framer Motion physics, and accessible DOM structures.",
    icon: <FaBriefcase />,
    color: "blue",
  },
];

/* -----------------------------------------
    Color Maps
--------------------------------------------*/
const colors: Record<string, string> = {
  cyan: "#06b6d4",
  fuchsia: "#d946ef",
  violet: "#8b5cf6",
  green: "#22c55e",
  blue: "#3b82f6",
};

/* -----------------------------------------
    3D Tilt Card Component
--------------------------------------------*/
const ExperienceCard = ({
  data,
  index,
  isLeft,
}: {
  data: (typeof experiences)[0];
  index: number;
  isLeft: boolean;
}) => {
  const { darkMode } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = (mouseY / height - 0.5) * -15;
    const rY = (mouseX / width - 0.5) * 15;

    rotateX.set(rX);
    rotateY.set(rY);
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  }

  const accentColor = colors[data.color];

  return (
    <div
      className={`relative w-full md:w-[45%] mb-12 md:mb-0 ${
        isLeft ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"
      }`}
    >
      {/* --- CONNECTION BEAM (Desktop) --- */}
      <div
        className={`hidden md:block absolute top-10 h-[2px] w-[10%] bg-gradient-to-r from-transparent via-${
          data.color
        }-500 to-transparent z-0 ${isLeft ? "-right-[10%]" : "-left-[10%"}`}
      >
        <div
          className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-${
            data.color
          }-400 shadow-[0_0_10px_currentColor] ${
            isLeft ? "right-0" : "left-0"
          }`}
        />
      </div>

      {/* --- CARD --- */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative perspective-1000"
      >
        <div
          className={`relative rounded-2xl p-[1px] overflow-hidden transition-all duration-500 group ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          {/* Neon Border Gradient */}
          <div
            className={`absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${
              isLeft
                ? "from-transparent to-" + data.color + "-500"
                : "from-" + data.color + "-500 to-transparent"
            }`}
          />

          {/* Inner Content */}
          <div
            className={`relative rounded-2xl p-6 md:p-8 h-full backdrop-blur-xl border transition-colors ${
              darkMode
                ? "bg-[#0a0a12]/90 border-white/5"
                : "bg-white/90 border-gray-200 shadow-xl"
            }`}
          >
            {/* Spotlight */}
            <motion.div
              style={{
                background: useMotionTemplate`
						radial-gradient(
							400px circle at ${x}px ${y}px,
							${accentColor}15,
							transparent 80%
						)
						`,
              }}
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Header */}
            <div
              className={`flex flex-col gap-2 mb-4 ${
                isLeft ? "md:items-end" : "md:items-start"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl mb-2 shadow-lg ${
                  darkMode
                    ? `bg-white/5 text-${data.color}-400`
                    : `bg-${data.color}-50 text-${data.color}-600`
                }`}
              >
                {data.icon}
              </span>
              <h3
                className={`text-2xl font-bold ${
                  // FIX 1: Role Title - text-black in light mode
                  darkMode ? "text-white" : "text-black"
                }`}
              >
                {data.role}
              </h3>
              <p
                className={`text-sm font-mono uppercase tracking-widest ${
                  // FIX 2: Company - Use a slightly darker shade in light mode
                  darkMode ? `text-${data.color}-400` : `text-${data.color}-700`
                }`}
              >
                {data.company}
              </p>
            </div>

            {/* Details */}
            <p
              className={`text-sm leading-relaxed mb-4 ${
                // FIX 3: Description - Use a darker gray for description in light mode
                darkMode ? "text-gray-400" : "text-gray-800"
              }`}
            >
              {data.desc}
            </p>

            {/* Period Badge */}
            <span
              className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${
                darkMode
                  ? `border-${data.color}-500/30 bg-${data.color}-500/10 text-${data.color}-300`
                  : // FIX 4: Period Text - Force text to black in light mode to guarantee visibility, as dynamic colors can fail
                    `border-${data.color}-200 bg-${data.color}-50 text-black`
              }`}
            >
              {data.period}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* -----------------------------------------
    Main Component
--------------------------------------------*/
const Experience: React.FC = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className={`relative w-full py-24 md:py-32 overflow-hidden transition-colors duration-700 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* --- BACKGROUND GRID --- */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100px_100px] ${
          darkMode ? "opacity-10" : "opacity-20"
        }`}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter"
          >
            <span className={darkMode ? "text-white" : "text-slate-900"}>
              Career
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              Timeline
            </span>
          </motion.h2>
          <div
            className={`h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]`}
          />
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* --- CENTRAL BEAM --- */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 h-full bg-gray-200/20 z-0">
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-cyan-500 via-purple-500 to-blue-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
            />
          </div>

          {/* Experience Nodes */}
          <div className="flex flex-col gap-12 md:gap-0">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className="relative flex md:block items-center"
                >
                  {/* Center Node (Reactor) */}
                  <div className="absolute left-[16px] md:left-1/2 transform -translate-x-1/2 z-20">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        darkMode
                          ? "bg-[#050510] border-cyan-500"
                          : "bg-white border-blue-500"
                      } shadow-[0_0_10px_currentColor] z-20 relative`}
                    >
                      <div
                        className={`absolute inset-0 rounded-full bg-${exp.color}-500 animate-ping opacity-30`}
                      />
                    </div>
                  </div>

                  {/* The Card */}
                  <div className="pl-12 md:pl-0 w-full">
                    <ExperienceCard data={exp} index={i} isLeft={isLeft} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
