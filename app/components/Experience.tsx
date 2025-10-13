"use client";
import React from "react";
import { motion } from "framer-motion";

// Timeline Icon Props
interface TimelineIconProps {
  path: string;
  color: "cyan" | "fuchsia" | "violet";
}

// Timeline Icon Component (using inline SVG)
const TimelineIcon: React.FC<TimelineIconProps> = ({ path, color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-7 h-7 text-${color}-400 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]`}
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

// Icon Paths
const branchPath =
  "M6 3v12M18 3v12M3 15a3 3 0 100 6 3 3 0 000-6zm12 0a3 3 0 100 6 3 3 0 000-6zm-6 0v6";
const dotPath =
  "M12 2a10 10 0 100 20 10 10 0 000-20zM12 12m-1 0a1 1 0 102 0 1 1 0 10-2 0";

// Experience Type
interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  details: string;
  iconPath: string;
  color: "cyan" | "fuchsia" | "violet";
}

// Experiences Array
const experiences: ExperienceItem[] = [
  {
    role: "Freelance Full Stack Developer",
    company: "Holiday Booking Platform",
    period: "2025 - Present",
    details:
      "Leading full-stack development with Next.js, Node.js, MongoDB, and Tailwind. Handling API design, deployment, and optimization for a seamless user experience.",
    iconPath: branchPath,
    color: "cyan",
  },
  {
    role: "Founder & Developer",
    company: "VibeXCode AI Dev Hub",
    period: "2025",
    details:
      "Building AI-powered developer tools, real-time chat apps, and collaborative platforms using Appwrite, Firebase, and Next.js.",
    iconPath: branchPath,
    color: "fuchsia",
  },
  {
    role: "IoT & Robotics Developer",
    company: "Autonomous Drone Competition",
    period: "2024",
    details:
      "Engineered autonomous navigation, manual mapping, and real-time controls for quadcopters. Led drone development using C++, embedded systems, and sensor integration.",
    iconPath: dotPath,
    color: "violet",
  },
  {
    role: "Linux Kernel Contributor",
    company: "Open Source Mentorship",
    period: "2024",
    details:
      "Developed kernel modules, improved documentation, and optimized performance for RISC-V systems. Focused on kselftest enhancements and patch submission workflow.",
    iconPath: branchPath,
    color: "cyan",
  },
  {
    role: "Frontend & Web Developer",
    company: "Personal Projects & Freelance",
    period: "2023 - 2025",
    details:
      "Crafted futuristic, responsive UIs using React, Next.js, and Tailwind CSS. Emphasized performance, animations, and user experience.",
    iconPath: dotPath,
    color: "fuchsia",
  },
];

const Experience: React.FC = () => {
  return (
    <section
      id="experience"
      className="relative w-full py-24 md:py-32 flex flex-col items-center px-4 md:px-6 z-10"
    >
      {/* Section Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        My Journey
      </motion.h2>

      <div className="max-w-5xl mx-auto relative">
        {/* Vertical Timeline Line */}
        <div
          className="absolute left-3 md:left-1/2 transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-cyan-400/50 via-fuchsia-400/50 to-violet-400/50 shadow-[0_0_15px_rgba(0,255,255,0.4)]"
          aria-hidden="true"
        />

        {experiences.map((exp, i) => {
          const isLeft = i % 2 === 0;

          return (
            <motion.div
              key={i}
              className={`mb-14 flex w-full ${
                isLeft ? "justify-start" : "justify-end"
              }`}
              initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.2, duration: 0.7 }}
            >
              {/* Timeline Node (Desktop Only) */}
              <div
                className={`absolute hidden md:flex top-6 left-1/2 transform -translate-x-1/2 z-10 items-center justify-center p-3 rounded-full border-4 border-gray-950 bg-white/10 backdrop-blur-sm shadow-xl shadow-${exp.color}-400/40`}
              >
                <TimelineIcon path={exp.iconPath} color={exp.color} />
              </div>

              {/* Experience Card */}
              <div
                className={`relative w-full md:w-5/12 p-6 rounded-2xl border border-${
                  exp.color
                }-400/30 bg-white/5 backdrop-blur-md shadow-lg shadow-${
                  exp.color
                }-400/20 transition-all duration-500 hover:shadow-2xl hover:shadow-${
                  exp.color
                }-400/40 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
              >
                {/* Mobile Icon */}
                <div className="block md:hidden absolute -left-6 top-6">
                  <TimelineIcon path={exp.iconPath} color={exp.color} />
                </div>

                <h3
                  className={`text-xl md:text-2xl font-bold text-${exp.color}-300`}
                >
                  {exp.role}
                </h3>
                <p className="text-gray-300 font-medium mb-1">{exp.company}</p>
                <p className="text-sm text-gray-400 mb-3">{exp.period}</p>
                <p className="text-gray-400 text-base">{exp.details}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
