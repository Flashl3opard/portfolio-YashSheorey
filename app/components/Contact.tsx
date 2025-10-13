"use client";
import { motion } from "framer-motion";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-6 py-20"
    >
      <motion.h2
        className="text-4xl md:text-6xl font-bold mb-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Get in Touch
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center gap-8 text-lg text-gray-300">
        <a
          href="mailto:yashsheorey@gmail.com"
          className="flex items-center gap-3 hover:text-teal-400"
        >
          <IoIosMail size={26} /> yashsheorey@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/flashl3opard"
          target="_blank"
          className="flex items-center gap-3 hover:text-teal-400"
        >
          <FaLinkedin size={26} /> LinkedIn
        </a>
        <a
          href="https://github.com/Flashl3opard"
          target="_blank"
          className="flex items-center gap-3 hover:text-teal-400"
        >
          <FaGithub size={26} /> GitHub
        </a>
      </div>
    </section>
  );
};

export default Contact;
