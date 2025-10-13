"use client";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-950 text-gray-500 text-center border-t border-gray-800">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        © {new Date().getFullYear()}{" "}
        <span className="text-teal-400">Yash Sheorey</span>. Crafted with ⚡
        Next.js & Tailwind CSS.
      </motion.p>
    </footer>
  );
};

export default Footer;
