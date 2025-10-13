"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Freelance Developer",
    company: "Holiday Booking Platform",
    period: "2025",
    details:
      "Worked with Next.js, MongoDB, and Node.js for full-stack development and deployment.",
  },
  {
    role: "IoT Developer",
    company: "Drone Competition",
    period: "2024",
    details:
      "Built autonomous navigation and manual mapping systems for quadcopter drones.",
  },
];

const Experience = () => {
  return (
    <section
      id="experience"
      className="min-h-screen bg-gradient-to-b from-gray-950 to-black text-white px-6 py-20"
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-10">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="border-l-4 border-teal-400 pl-6 hover:bg-gray-900/50 p-4 rounded-lg transition duration-300"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-teal-400">{exp.role}</h3>
            <p className="text-gray-300">{exp.company}</p>
            <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
            <p className="text-gray-400">{exp.details}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
