"use client";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiAppwrite } from "react-icons/si";

const skills = [
  { name: "React", icon: <FaReact className="text-sky-400 text-5xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white text-5xl" /> },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-400 text-5xl" />,
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-5xl" /> },
  {
    name: "MongoDB",
    icon: <FaDatabase className="text-emerald-400 text-5xl" />,
  },
  { name: "Appwrite", icon: <SiAppwrite className="text-pink-400 text-5xl" /> },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen bg-gradient-to-tr from-gray-950 via-gray-900 to-black text-white flex flex-col items-center justify-center px-6 py-20"
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tech Stack
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center space-y-3 bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition duration-300 shadow-lg shadow-teal-500/10"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {skill.icon}
            <span className="text-sm md:text-lg">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
