"use client";

import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { FiAward, FiGlobe, FiCode, FiArrowRight } from "react-icons/fi";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
    Data & Types
--------------------------------------------*/
interface Certificate {
  name: string;
  issuer: string;
  date: string;
  link: string;
  icon: React.ReactNode;
  color: string; // Tailwind color class or hex for primary accent
}

const certifications: Certificate[] = [
  // --- NEW CERTIFICATES ---
  {
    name: "Introduction to Cloud Computing",
    issuer: "NPTEL",
    date: "Oct 2024",
    link: "#",
    icon: <FiGlobe />,
    color: "#22c55e", // Green
  },
  {
    name: "Linux Kernel Development",
    issuer: "The Linux Foundation",
    date: "Oct 2025",
    link: "#",
    icon: <FiCode />,
    color: "#8b5cf6", // Violet
  },
  {
    name: "Introduction to Machine Learning",
    issuer: "Microsoft Azure",
    date: "May 2024",
    link: "#",
    icon: <FiAward />,
    color: "#38bdf8", // Sky Blue
  },
  {
    name: "Internet of Things (IoT) Architectures",
    issuer: "NPTEL",
    date: "April 2025",
    link: "#",
    icon: <FiGlobe />,
    color: "#fbbf24", // Amber
  },
];

/* -----------------------------------------
    Holographic Certificate Card Component
--------------------------------------------*/
const CertCard = ({ cert, index }: { cert: Certificate; index: number }) => {
  const { darkMode } = useTheme();
  // FIX 1: Use HTMLAnchorElement for the ref since motion.a renders an <a> tag
  const ref = useRef<HTMLAnchorElement>(null);

  // Mouse Physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateXSpring = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 300, damping: 30 });

  // FIX 2: Use HTMLAnchorElement for the mouse event parameter
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate 3D Rotation (less extreme than the project card)
    const rX = (mouseY / height - 0.5) * 10; // -5 to 5 deg
    const rY = (mouseX / width - 0.5) * -10; // 5 to -5 deg

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
    <motion.a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="group relative w-full h-full min-h-[180px] rounded-2xl perspective-1000 cursor-pointer block transition-transform duration-300 md:hover:scale-[1.03]"
    >
      <div
        className={`absolute inset-0 rounded-2xl p-[1px] overflow-hidden border transition-colors duration-300 ${
          darkMode
            ? "bg-[#0a0a16] border-white/10 group-hover:border-white/20"
            : "bg-white border-gray-200 shadow-lg group-hover:shadow-xl"
        }`}
      >
        {/* --- HOLOGRAPHIC SPOTLIGHT --- */}
        <motion.div
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${xSpring}px ${ySpring}px,
                ${cert.color}20,
                transparent 80%
              )
            `,
          }}
          className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* --- INNER CONTENT --- */}
        <div
          className={`relative z-20 h-full p-6 rounded-2xl flex flex-col justify-between transition-colors ${
            darkMode ? "bg-[#0a0a16]" : "bg-white/90"
          }`}
        >
          <div className="flex items-start justify-between">
            {/* Title & Issuer */}
            <div className="mr-4">
              <h3
                className={`text-lg sm:text-xl font-bold mb-1 transition-colors ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {cert.name}
              </h3>
              <p
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: cert.color }}
              >
                {cert.issuer}
              </p>
            </div>

            {/* Icon */}
            <div
              className="text-2xl p-3 rounded-full shrink-0 transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: `${cert.color}15`,
                color: cert.color,
                boxShadow: `0 0 15px ${cert.color}40`,
              }}
            >
              {cert.icon}
            </div>
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center pt-4 border-t border-dashed border-gray-700/30 mt-4">
            <span
              className={`text-xs font-mono tracking-wider ${
                darkMode ? "text-gray-400" : "text-slate-600"
              }`}
            >
              Issued: {cert.date}
            </span>

            <div
              className="flex items-center text-sm font-bold"
              style={{ color: cert.color }}
            >
              Verify
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

/* -----------------------------------------
    Main Component
--------------------------------------------*/
const Certifications: React.FC = () => {
  const { darkMode } = useTheme();

  return (
    <section
      id="certifications"
      className={`relative w-full py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
    >
      {/* Background Element - A subtle holographic grid/pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className={`h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] ${
            darkMode ? "opacity-30" : "opacity-50"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-current via-transparent to-current opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            <span className={darkMode ? "text-white" : "text-slate-900"}>
              CORE{" "}
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-cyan-400">
              CERTIFICATES
            </span>
          </h2>
          <p
            className={`text-lg mt-3 ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Proof of Proficiency and Specialized Knowledge.
          </p>
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <a
            href="#"
            className={`inline-flex items-center gap-2 text-lg font-bold border-b-2 pb-1 transition-all hover:gap-4 ${
              darkMode
                ? "text-rose-400 border-rose-400 hover:text-rose-300"
                : "text-red-600 border-red-600 hover:text-red-500"
            }`}
          >
            See All Credentials <FiAward />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
