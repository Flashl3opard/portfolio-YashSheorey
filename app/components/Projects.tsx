"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    name: "Washify",
    desc: "Full-stack laundry platform with Next.js, MongoDB, and Tailwind.",
    img: "/washify.png",
    link: "#",
  },
  {
    name: "Bug Tracker",
    desc: "Smart bug tracking dashboard with priority control and analytics.",
    img: "/bugtracker.png",
    link: "#",
  },
  {
    name: "VibeXCode",
    desc: "AI-powered dev hub with Appwrite, Firebase, and real-time chat.",
    img: "/vibexcode.png",
    link: "#",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen bg-black text-white px-8 py-20"
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-900 rounded-2xl overflow-hidden hover:scale-[1.03] transition duration-300 border border-gray-700"
            whileHover={{ y: -5 }}
          >
            <Image
              src={p.img}
              alt={p.name}
              width={600}
              height={400}
              className="object-cover w-full h-48"
            />
            <div className="p-6 space-y-2">
              <h3 className="text-2xl font-semibold text-teal-400">{p.name}</h3>
              <p className="text-gray-400">{p.desc}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Projects;
