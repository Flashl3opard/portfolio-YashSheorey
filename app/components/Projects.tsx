"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
   Data & Types
--------------------------------------------*/
interface Project {
  name: string;
  desc: string;
  link: string;
  github: string;
  tech: string[];
  color: string; // hex or tailwind class
  image?: string;
}

const projects: Project[] = [
  {
    name: "OjasAI Platform",
    desc: "Generative AI suite for text-to-image & code generation using OpenAI & Replicate.",
    link: "https://ojas-ai.com",
    github: "https://github.com/Flashl3opard/OjasAI",
    tech: ["Next.js 14", "OpenAI", "Stripe", "Tailwind"],
    color: "#d946ef", // Fuchsia
    image: "/images/ojas.png",
  },
  {
    name: "VibeXCode",
    desc: "Real-time collaborative IDE with live cursors, chat, and cloud execution.",
    link: "https://vibex.dev",
    github: "https://github.com/Flashl3opard/vibexcode",
    tech: ["React", "Socket.io", "Docker", "Monaco"],
    color: "#06b6d4", // Cyan
    image: "/images/vibe.png",
  },
  {
    name: "Cosmic Portfolio",
    desc: "The website you are looking at. Advanced animations and 3D physics.",
    link: "#",
    github: "https://github.com/Flashl3opard/portfolio",
    tech: ["Framer Motion", "Three.js", "TypeScript"],
    color: "#8b5cf6", // Violet
  },
  {
    name: "CryptoHunter",
    desc: "Live cryptocurrency tracker with predictive algorithms and historical charting.",
    link: "#",
    github: "https://github.com/Flashl3opard/crypto",
    tech: ["React", "Chart.js", "CoinGecko API"],
    color: "#14b8a6", // Teal
  },
];

/* -----------------------------------------
   3D Cyber Card Component
--------------------------------------------*/
const CyberCard = ({ project, index }: { project: Project; index: number }) => {
  const { darkMode } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate 3D Rotation
    const rX = (mouseY / height - 0.5) * 20; // -10 to 10 deg
    const rY = (mouseX / width - 0.5) * -20; // 10 to -10 deg

    rotateX.set(rX);
    rotateY.set(rY);

    // Calculate Spotlight Position
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[450px] w-full rounded-3xl perspective-1000"
    >
      <div
        className={`absolute inset-0 rounded-3xl overflow-hidden border transition-colors duration-300 group ${
          darkMode
            ? "bg-[#0a0a16] border-white/10"
            : "bg-white border-gray-200 shadow-2xl"
        }`}
      >
        {/* --- HOLOGRAPHIC SPOTLIGHT --- */}
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                600px circle at ${xSpring}px ${ySpring}px,
                ${project.color}20,
                transparent 80%
              )
            `,
          }}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* --- IMAGE / PREVIEW AREA --- */}
        <div className="relative h-[55%] w-full overflow-hidden">
          {/* Scanline Effect */}
          <div className="absolute inset-0 z-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

          {project.image ? (
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${project.color}40, transparent)`,
              }}
            >
              <span
                className={`text-6xl font-bold opacity-20`}
                style={{ color: project.color }}
              >
                {project.name.substring(0, 2)}
              </span>
            </div>
          )}

          {/* Tech Overlay UI */}
          <div className="absolute top-4 left-4 z-20 flex gap-2">
            <div className="px-2 py-1 text-[10px] font-mono bg-black/60 text-white backdrop-blur-sm border border-white/10 rounded">
              SYS.VER.2.0
            </div>
          </div>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="relative h-[45%] p-6 flex flex-col justify-between bg-gradient-to-b from-transparent to-black/5">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {project.name}
              </h3>
              <FiExternalLink
                className={`text-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              />
            </div>

            <p
              className={`text-sm line-clamp-2 mb-4 ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded border ${
                    darkMode
                      ? "border-white/10 text-gray-400"
                      : "border-gray-300 text-gray-600"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2 text-center rounded-lg font-bold text-sm bg-white text-black hover:bg-gray-200 transition-colors"
            >
              View Live
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className={`p-2 rounded-lg border transition-colors ${
                darkMode
                  ? "border-white/20 hover:bg-white/10 text-white"
                  : "border-gray-300 hover:bg-gray-100 text-slate-900"
              }`}
            >
              <FiGithub size={20} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* -----------------------------------------
   Main Section
--------------------------------------------*/
const Projects: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="projects"
      className={`relative w-full py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className={`absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-cyan-500`}
        />
        <div
          className={`absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-purple-500`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex flex-col md:flex-row items-end justify-between gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Selected <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-600 animate-gradient-x">
                Works
              </span>
            </h2>
          </div>
          <div
            className={`mb-2 hidden md:block h-px flex-1 mx-12 ${
              darkMode ? "bg-gray-800" : "bg-gray-300"
            }`}
          />
          <div
            className={`text-right ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            <p className="font-mono text-sm">EST. 2025</p>
            <p className="font-mono text-sm">BUILDING THE FUTURE</p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {projects.map((p, i) => (
            <CyberCard key={i} project={p} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 text-center"
        >
          <a
            href="https://github.com/Flashl3opard"
            target="_blank"
            className={`inline-flex items-center gap-2 text-lg font-bold border-b-2 pb-1 transition-all hover:gap-4 ${
              darkMode
                ? "text-cyan-400 border-cyan-400 hover:text-cyan-300"
                : "text-blue-600 border-blue-600 hover:text-blue-500"
            }`}
          >
            View Full Archive <FiExternalLink />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
