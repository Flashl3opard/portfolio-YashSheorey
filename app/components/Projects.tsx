"use client";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

// Interface for Project data
interface Project {
  name: string;
  desc: string;
  link: string;
  tag: string;
  color: "cyan" | "fuchsia" | "violet" | "teal";
}

// Projects array
const projects: Project[] = [
  {
    name: "OjasAI Platform",
    desc: "AI-powered platform for content generation and image manipulation. Built with Next.js, OpenAI API, and Vercel hosting.",
    link: "https://github.com/Flashl3opard/OjasAI",
    tag: "Next.js | OpenAI | AI",
    color: "fuchsia",
  },
  {
    name: "VibeXCode",
    desc: "AI-powered developer hub featuring real-time chat, code snippets, and decentralized storage using Appwrite and Next.js.",
    link: "https://github.com/Flashl3opard/vibexcode",
    tag: "AI | Appwrite | Next.js",
    color: "cyan",
  },
  {
    name: "Washify",
    desc: "A full-stack laundry platform built with Next.js, MongoDB, and Tailwind CSS. Features real-time tracking and scheduling functionality.",
    link: "https://github.com/Flashl3opard/washify",
    tag: "Next.js | MongoDB | Full Stack",
    color: "violet",
  },
  {
    name: "Cosmic Portfolio",
    desc: "This very portfolio, demonstrating modern React, Framer Motion, and a highly customized Tailwind CSS aesthetic for a futuristic look.",
    link: "https://github.com/Flashl3opard/cosmic-portfolio",
    tag: "React | Framer Motion | UI/UX",
    color: "teal",
  },
  {
    name: "Abhikalpan (Mockup)",
    desc: "Web design agency mockup utilizing advanced web animations and a focus on premium, conversion-optimized landing pages.",
    link: "https://github.com/Flashl3opard/abhikalpan-mock",
    tag: "React | UI/UX | Animation",
    color: "fuchsia",
  },
  {
    name: "Bug-Tracking App",
    desc: "Smart dashboard for priority-based bug tracking and project analytics. Utilizes Next.js and Firebase for real-time updates and collaboration.",
    link: "https://github.com/Flashl3opard/bug-tracker",
    tag: "Next.js | Firebase | Dashboard",
    color: "cyan",
  },
];

// Mappings for dynamic Tailwind classes
const gradientMap = {
  fuchsia: "from-fuchsia-500/70 to-fuchsia-900/50",
  cyan: "from-cyan-500/70 to-cyan-900/50",
  violet: "from-violet-500/70 to-violet-900/50",
  teal: "from-teal-500/70 to-teal-900/50",
};

const textColorMap = {
  fuchsia: "text-fuchsia-300",
  cyan: "text-cyan-300",
  violet: "text-violet-300",
  teal: "text-teal-300",
};

const borderColorMap = {
  fuchsia: "border-fuchsia-500/50",
  cyan: "border-cyan-500/50",
  violet: "border-violet-500/50",
  teal: "border-teal-500/50",
};

// Placeholder Image Component
const ImagePlaceholder: React.FC<{ color: Project["color"]; name: string }> = ({
  color,
  name,
}) => (
  <div
    className={`w-full h-48 flex items-center justify-center font-extrabold text-2xl text-white/90 p-4 transition-all duration-500 rounded-t-2xl bg-gradient-to-br ${gradientMap[color]} shadow-inner`}
  >
    <span className="text-center italic opacity-70">
      {name.split(" ")[0]} Preview
    </span>
  </div>
);

// GitHub SVG Icon
const GitHubIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5 text-white"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.8c0-2.4-1-3.4-2.8-3.6 4-.4 6-2 6-5.5 0-1.5-.5-2.7-1.3-3.7 0 0-1.1-.3-3.5 1.3-1-.3-2.2-.4-3.5-.4-1.3 0-2.5.2-3.5.4C5.1 5.2 4 5.5 4 5.5c-.8 1-1.3 2.2-1.3 3.7 0 3.5 2 5.1 6 5.5-1.8.2-2.8 1.2-2.8 3.6V22" />
  </svg>
);

const transition = { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] };

// Variants for slide animation
const slideVariants = (direction: number, i: number) => ({
  enter: {
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
    // Add the continuous float animation here
    y: [0, i % 2 === 0 ? 8 : -8, 0],
    transition: {
      ...transition,
      // Stagger the initial fade-in and set up the continuous y-float
      opacity: { delay: i * 0.1, duration: 0.5 },
      y: {
        duration: 4 + i * 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  },
  exit: {
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    transition: { duration: 0.4 },
  },
});

const Projects: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  // itemsPerPage will determine the number of columns on large screens (lg:grid-cols-3)
  const itemsPerPage = 3;

  const totalItems = projects.length;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    const newIndex = index + newDirection * itemsPerPage;

    let finalIndex: number;

    if (newIndex < 0) {
      finalIndex = 0;
    } else if (newIndex + itemsPerPage > totalItems) {
      // Logic for the last page: ensures we start at the correct position
      finalIndex =
        totalItems -
        (totalItems % itemsPerPage === 0
          ? itemsPerPage
          : totalItems % itemsPerPage);
    } else {
      finalIndex = newIndex;
    }

    setIndex(finalIndex);
  };

  const prev = () => paginate(-1);
  const next = () => paginate(1);

  // Projects currently visible on the page
  const visibleProjects = projects.slice(index, index + itemsPerPage);

  // Determine if buttons should be disabled
  const isPrevDisabled = index === 0;
  const isNextDisabled = index + visibleProjects.length >= totalItems;

  // Calculate total pages for display
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.ceil((index + 1) / itemsPerPage);

  return (
    <section
      id="projects"
      className="relative w-full py-24 md:py-32 flex flex-col items-center px-4 md:px-6 z-10 overflow-hidden" // Added overflow-hidden to prevent horizontal scroll during transition
    >
      {/* Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        My Cosmic Creations
      </motion.h2>

      {/* Responsive Grid Layout with Slide Transition */}
      <div className="max-w-7xl w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentPage} // Key change forces AnimatePresence to see a new component and run the exit/enter animations
            className="w-full grid grid-cols-1 gap-12 lg:grid-cols-3"
          >
            {visibleProjects.map((p, i) => (
              <motion.a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                // Motion properties using variants
                variants={slideVariants(direction, i)}
                initial="enter"
                animate="center"
                exit="exit"
                whileHover={{ y: -8 }}
                className="group block bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden relative border border-cyan-400/30 hover:border-fuchsia-400/50 shadow-lg hover:shadow-[0_0_30px_rgba(255,0,255,0.4)] transition-all duration-300 cursor-pointer"
              >
                {/* Placeholder Image */}
                <ImagePlaceholder color={p.color} name={p.name} />

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300">
                    {p.name}
                  </h3>
                  <p className="text-gray-300 text-sm h-10 overflow-hidden">
                    {p.desc}
                  </p>

                  {/* Tag */}
                  <span
                    className={`inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-${
                      p.color
                    }-600/30 ${textColorMap[p.color]} border ${
                      borderColorMap[p.color]
                    }`}
                  >
                    {p.tag}
                  </span>
                </div>

                {/* GitHub Button on Hover (Opacity controlled by group-hover) */}
                <div
                  className="absolute bottom-4 right-4 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 rounded-full hover:bg-black/80 shadow-lg"
                  aria-label="View project on GitHub"
                >
                  <GitHubIcon />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          className="flex space-x-6 mt-16 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <button
            onClick={prev}
            disabled={isPrevDisabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border-2 text-cyan-300 transition-all duration-300 shadow-md ${
              isPrevDisabled
                ? "border-gray-700 text-gray-700 cursor-not-allowed"
                : "border-cyan-400 hover:bg-cyan-400/10 hover:shadow-cyan-400/40"
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>

          <div className="flex items-center text-lg font-mono text-gray-400 px-4">
            <span className="text-cyan-400 font-semibold">{currentPage}</span> /{" "}
            {totalPages}
          </div>

          <button
            onClick={next}
            disabled={isNextDisabled}
            className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-semibold transition-all duration-300 shadow-lg ${
              isNextDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:shadow-fuchsia-500/40"
            }`}
            aria-label="Next page"
          >
            Next
          </button>
        </motion.div>
      )}
    </section>
  );
};

export default Projects;
