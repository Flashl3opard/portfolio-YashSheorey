"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    name: "Washify",
    desc: "A full-stack laundry platform built with Next.js, MongoDB, and Tailwind CSS. Features real-time tracking and scheduling.",
    img: "/washify.png",
    // NOTE: Replace these placeholder links with your actual project URLs
    link: "https://github.com/your-username/washify",
    tag: "Next.js | MongoDB",
  },
  {
    name: "Bug Tracker",
    desc: "Smart dashboard for priority-based bug tracking and project analytics. Utilizes Next.js and Firebase for real-time updates.",
    img: "/bugtracker.png",
    link: "https://github.com/your-username/bug-tracker",
    tag: "Next.js | Firebase",
  },
  {
    name: "VibeXCode",
    desc: "AI-powered developer hub featuring real-time chat, code snippets, and decentralized storage using Appwrite.",
    img: "/vibexcode.png",
    link: "https://github.com/your-username/vibexcode",
    tag: "AI | Appwrite",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      // Removed min-h-screen and background classes to rely on the global layout.tsx
      className="relative w-full py-24 md:py-32 flex flex-col items-center px-4 md:px-6 z-10"
    >
      {/* --- Section Header --- */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        My Cosmic Creations
      </motion.h2>

      {/* --- Projects Grid --- */}
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            // Glass Card Style: Semi-transparent background, subtle border, hover shadow
            className="group block bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 border border-cyan-400/30 hover:border-fuchsia-400/50 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(255,0,255,0.4)]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            {/* Image Container */}
            <div className="relative w-full h-48 overflow-hidden">
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content Area */}
            <div className="p-6 space-y-3">
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300">
                {p.name}
              </h3>
              <p className="text-gray-300 text-sm">{p.desc}</p>

              {/* Tags/Tech Stack */}
              <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-fuchsia-600/30 text-fuchsia-300 border border-fuchsia-500/50">
                {p.tag}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
