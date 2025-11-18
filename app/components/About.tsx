"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import {
  FaDownload,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaServer,
  FaCode,
  FaBrain,
  FaMicrochip,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMongodb,
  SiDocker,
  SiLinux,
} from "react-icons/si";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
   Data & Config
--------------------------------------------*/
const stats = [
  { label: "Years Experience", value: "2+" },
  { label: "Projects Completed", value: "15+" },
  { label: "Global Contribs", value: "100+" },
];

const techTicker = [
  { Icon: FaReact, color: "text-cyan-400" },
  { Icon: SiNextdotjs, color: "text-white" },
  { Icon: SiTypescript, color: "text-blue-500" },
  { Icon: SiTailwindcss, color: "text-cyan-300" },
  { Icon: FaNodeJs, color: "text-green-500" },
  { Icon: SiMongodb, color: "text-green-400" },
  { Icon: FaDatabase, color: "text-yellow-400" },
  { Icon: SiDocker, color: "text-blue-400" },
  { Icon: SiLinux, color: "text-yellow-200" },
];

const features = [
  {
    title: "Frontend Architecture",
    desc: "Pixel-perfect, responsive UIs with React, Next.js & Framer Motion.",
    icon: <FaCode />,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Backend Systems",
    desc: "Scalable APIs & DB management using Node, Express, Appwrite & SQL.",
    icon: <FaServer />,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "AI & IoT Fusion",
    desc: "Integrating LLMs and Edge computing for smart, adaptive applications.",
    icon: <FaMicrochip />,
    color: "from-fuchsia-500 to-pink-500",
  },
];

/* -----------------------------------------
   Spotlight Card Component
--------------------------------------------*/
const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-white/10 overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

/* -----------------------------------------
   Infinite Marquee Component
--------------------------------------------*/
const Marquee = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="w-full overflow-hidden py-6 flex mask-linear-fade relative">
      <motion.div
        className="flex gap-12 md:gap-24 min-w-full"
        animate={{ x: "-50%" }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {[...techTicker, ...techTicker, ...techTicker].map((tech, i) => (
          <div
            key={i}
            className={`text-4xl md:text-5xl flex items-center gap-2 ${
              darkMode ? "opacity-80" : "opacity-60 drop-shadow-md"
            }`}
          >
            <tech.Icon className={tech.color} />
          </div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div
        className={`absolute inset-y-0 left-0 w-20 bg-gradient-to-r ${
          darkMode ? "from-[#050510]" : "from-gray-50"
        } to-transparent z-10`}
      />
      <div
        className={`absolute inset-y-0 right-0 w-20 bg-gradient-to-l ${
          darkMode ? "from-[#050510]" : "from-gray-50"
        } to-transparent z-10`}
      />
    </div>
  );
};

/* -----------------------------------------
   Main About Component
--------------------------------------------*/
const About: React.FC = () => {
  const { darkMode } = useTheme();
  const containerRef = useRef(null);

  // removed unused variable "y"
  useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className={`relative w-full py-24 md:py-32 px-6 overflow-hidden transition-colors duration-700 ${
        darkMode ? "bg-[#050510] text-white" : "bg-gray-50 text-slate-900"
      }`}
    >
      {/* Background Grid */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] ${
          darkMode ? "opacity-20" : "opacity-40"
        }`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              The Dev
            </span>
          </h2>

          <div
            className={`w-24 h-1 mx-auto mt-4 rounded-full ${
              darkMode ? "bg-gray-800" : "bg-gray-300"
            }`}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.2 }}
            />
          </div>
        </motion.div>

        {/* ----------------------------------------------------
            BIO SECTION — FIXED APOSTROPHES
        ----------------------------------------------------- */}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
          {/* BIO CARD */}
          <motion.div
            className="md:col-span-7 h-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SpotlightCard
              className={`h-full rounded-3xl p-8 md:p-10 backdrop-blur-xl flex flex-col justify-center shadow-2xl ${
                darkMode ? "bg-white/5" : "bg-white shadow-blue-100"
              }`}
              spotlightColor={
                darkMode
                  ? "rgba(6, 182, 212, 0.15)"
                  : "rgba(59, 130, 246, 0.15)"
              }
            >
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <span className="text-4xl">👋</span>
                I&apos;m{" "}
                <span className={darkMode ? "text-cyan-300" : "text-blue-600"}>
                  Yash Sheorey
                </span>
              </h3>

              <p
                className={`text-lg leading-relaxed mb-6 ${
                  darkMode ? "text-gray-300" : "text-slate-600"
                }`}
              >
                A passionate developer obsessed with building
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                  {" "}
                  futuristic digital experiences
                </span>
                . I bridge the gap between design and engineering, turning
                complex problems into simple, beautiful, and performant
                interfaces.
              </p>

              <p
                className={`text-lg leading-relaxed mb-8 ${
                  darkMode ? "text-gray-400" : "text-slate-500"
                }`}
              >
                When I&apos;m not coding, I&apos;m exploring AI models,
                tinkering with IoT, or contributing to open-source.
              </p>

              {/* Resume Button */}
              <div className="flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  download
                  className={`group relative px-6 py-3 rounded-full font-bold overflow-hidden ${
                    darkMode ? "bg-white text-black" : "bg-slate-900 text-white"
                  }`}
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center gap-2 z-10 group-hover:text-black transition-colors">
                    <FaDownload /> Download Resume
                  </span>
                </a>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* RIGHT SIDE COLUMN */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Avatar / Hologram */}
            <motion.div
              className="flex-1 min-h-[250px]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpotlightCard
                className={`h-full rounded-3xl p-6 flex items-center justify-center relative overflow-hidden ${
                  darkMode
                    ? "bg-gradient-to-br from-purple-900/20 to-black"
                    : "bg-gradient-to-br from-blue-50 to-white shadow-lg shadow-blue-100/50"
                }`}
              >
                {/* Rings */}
                <div
                  className={`absolute w-64 h-64 rounded-full border-2 animate-[spin_10s_linear_infinite] ${
                    darkMode
                      ? "border-cyan-500/20 border-t-cyan-500"
                      : "border-blue-200 border-t-blue-500"
                  }`}
                />
                <div
                  className={`absolute w-48 h-48 rounded-full border-2 animate-[spin_15s_linear_infinite_reverse] ${
                    darkMode
                      ? "border-purple-500/20 border-t-purple-500"
                      : "border-violet-200 border-t-violet-500"
                  }`}
                />

                <div className="relative z-10 text-center">
                  <FaBrain
                    className={`text-6xl mx-auto mb-2 ${
                      darkMode ? "text-cyan-300" : "text-blue-600"
                    }`}
                  />
                  <div
                    className={`font-mono text-xs ${
                      darkMode ? "text-cyan-500" : "text-blue-400"
                    }`}
                  >
                    SYSTEM.ONLINE
                  </div>
                  <div
                    className={`font-bold text-xl mt-1 ${
                      darkMode ? "text-white" : "text-slate-800"
                    }`}
                  >
                    AI Enthusiast
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className={`rounded-2xl p-4 text-center border ${
                    darkMode
                      ? "bg-white/5 border-white/10"
                      : "bg-white border-gray-200 shadow-sm"
                  }`}
                >
                  <div
                    className={`text-2xl md:text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-br from-cyan-400 to-purple-600`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-[10px] md:text-xs uppercase tracking-wide font-bold ${
                      darkMode ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Expertise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <SpotlightCard
                className={`h-full rounded-3xl p-8 group relative overflow-hidden transition-transform hover:-translate-y-2 ${
                  darkMode ? "bg-black/40" : "bg-white shadow-xl shadow-blue-50"
                }`}
                spotlightColor={
                  darkMode
                    ? "rgba(139, 92, 246, 0.15)"
                    : "rgba(99, 102, 241, 0.15)"
                }
              >
                <div
                  className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-2xl bg-gradient-to-br ${f.color} text-white shadow-lg`}
                >
                  {f.icon}
                </div>
                <h4
                  className={`text-xl font-bold mb-3 ${
                    darkMode ? "text-white" : "text-slate-800"
                  }`}
                >
                  {f.title}
                </h4>
                <p
                  className={`text-sm leading-relaxed ${
                    darkMode ? "text-gray-400" : "text-slate-500"
                  }`}
                >
                  {f.desc}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

        {/* Tech Marquee */}
        <div className="relative w-full">
          <div className="text-center mb-6 opacity-50 font-mono text-sm uppercase tracking-widest">
            Technologies I use
          </div>
          <Marquee darkMode={darkMode} />
        </div>
      </div>
    </section>
  );
};

export default About;
