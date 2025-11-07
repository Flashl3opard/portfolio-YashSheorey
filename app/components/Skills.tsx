"use client";

import { motion } from "framer-motion";
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
  SiGoland,
  SiExpress,
} from "react-icons/si";
import { useTheme } from "./ThemeContext"; // 👈 Import useTheme

const techSections = [
  {
    title: "Languages",
    skills: [
      {
        name: "JavaScript",
        icon: <FaJs className="text-yellow-400 text-5xl" />,
      },
      {
        name: "TypeScript",
        // This was SiNextdotjs, which is odd. I'll assume you meant a TS icon,
        // but for now, I'll leave your original icon choice.
        icon: <SiNextdotjs className="text-blue-400 text-5xl" />,
      },
      { name: "Python", icon: <FaPython className="text-blue-500 text-5xl" /> },
      { name: "GoLang", icon: <SiGoland className="text-cyan-400 text-5xl" /> },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: <FaReact className="text-sky-400 text-5xl" /> },
      {
        name: "Next.js",
        icon: <SiNextdotjs className="text-white text-5xl" />,
      },
      {
        name: "Express.js",
        icon: <SiExpress className="text-gray-400 text-5xl" />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss className="text-cyan-400 text-5xl" />,
      },
      {
        name: "Node.js",
        icon: <FaNodeJs className="text-green-500 text-5xl" />,
      },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      {
        name: "MongoDB",
        icon: <FaDatabase className="text-emerald-400 text-5xl" />,
      },
      {
        name: "Appwrite",
        icon: <SiAppwrite className="text-pink-400 text-5xl" />,
      },
      { name: "Git", icon: <FaGitAlt className="text-orange-500 text-5xl" /> },
    ],
  },
];

const Skills = () => {
  const { darkMode } = useTheme(); // 👈 Use the theme context

  return (
    <section
      id="skills"
      className={`min-h-screen w-full flex flex-col items-center justify-center px-6 py-24 z-10 transition-colors duration-500 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50" // 👈 Dynamic background
      }`}
    >
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold mb-16 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)] text-center" // 👈 Matched gradient
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        Tech Stack & Tools
      </motion.h2>

      {/* Sections */}
      <div className="flex flex-col md:flex-row md:justify-center md:gap-12 w-full max-w-6xl">
        {techSections.map((section, sIndex) => (
          <motion.div
            key={sIndex}
            className="flex-1 mb-12 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: sIndex * 0.2, duration: 0.6 }}
          >
            <h3
              className={`text-2xl md:text-3xl font-semibold mb-6 text-center ${
                darkMode ? "text-cyan-300" : "text-cyan-600" // 👈 Dynamic text
              }`}
            >
              {section.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {section.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className={`flex flex-col items-center justify-center rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                    darkMode
                      ? "bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-[0_0_30px_rgba(0,255,255,0.25)]"
                      : "bg-white/70 backdrop-blur-sm border border-gray-300 shadow-lg hover:shadow-cyan-400/30" // 👈 Dynamic card
                  }`}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {skill.icon}
                  <span
                    className={`mt-3 font-medium text-sm md:text-base text-center ${
                      darkMode ? "text-white" : "text-gray-900" // 👈 Dynamic text
                    }`}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
