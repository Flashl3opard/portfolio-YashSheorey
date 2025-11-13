"use client";

import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";

// -------------------------
// SVG ICON COMPONENT
// -------------------------
interface IconProps {
  svgPath: string;
  className?: string;
}

const ContactIcon: React.FC<IconProps> = ({ svgPath, className = "" }) => (
  <svg
    role="img"
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`}
  >
    <path d={svgPath} />
  </svg>
);

const mailPath =
  "M2.003 5.464c0-.66.536-1.196 1.196-1.196h17.602c.66 0 1.196.536 1.196 1.196V18.54c0 .66-.536 1.196-1.196 1.196H3.2c-.66 0-1.197-.536-1.197-1.196zm2.25 1.19l7.747 5.097 7.74-5.094a.695.695 0 00-.776-1.178L12 11.233 4.257 5.385a.695.695 0 10-.775 1.178z";

// -------------------------
// CONTACT FORM TYPES
// -------------------------
interface FormDataType {
  name: string;
  email: string;
  message: string;
}

// -------------------------
// MAIN CONTACT COMPONENT
// -------------------------
const Contact: React.FC = () => {
  const { darkMode } = useTheme();

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { name, email, message } = formData;

    const mailto = `mailto:yashsheorey@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry: ${name}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailto;

    setFormData({ name: "", email: "", message: "" });
  };

  // -------------------------
  // THEME / UI CLASSES
  // -------------------------
  const inputClasses = `w-full p-4 rounded-xl border transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-2
    ${
      darkMode
        ? "bg-white/5 text-gray-200 border-cyan-400/30 focus:ring-fuchsia-400/80"
        : "bg-white/70 text-gray-800 border-fuchsia-400/30 focus:ring-cyan-400/80"
    }`;

  const labelClasses = `block text-sm font-medium mb-2 mt-4 ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`;

  const bgGradient = darkMode
    ? "bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e]"
    : "bg-gradient-to-br from-[#f5f5ff] via-[#e8f0ff] to-[#dfe9ff]";

  const textColor = darkMode ? "text-gray-300" : "text-gray-700";

  return (
    <section
      id="contact"
      className={`relative w-full py-24 md:py-32 flex flex-col items-center px-6 z-10 overflow-hidden transition-all duration-700 ${bgGradient}`}
    >
      {/* ---------------------- */}
      {/* SECTION HEADER */}
      {/* ---------------------- */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-8 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Initiate Contact
      </motion.h2>

      <motion.p
        className={`text-lg md:text-xl max-w-2xl text-center mb-12 ${textColor}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Ready to build something extraordinary? Send a signal and let’s create
        something <strong>cosmic</strong>.
      </motion.p>

      {/* ---------------------- */}
      {/* CONTACT FORM */}
      {/* ---------------------- */}
      <motion.form
        onSubmit={handleSubmit}
        className={`w-full max-w-4xl p-8 md:p-12 rounded-3xl backdrop-blur-xl border shadow-2xl transition-all duration-500
          ${
            darkMode
              ? "bg-white/5 border-fuchsia-500/20 shadow-fuchsia-500/20 hover:shadow-cyan-500/30"
              : "bg-white/80 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-fuchsia-500/30"
          }`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        {/* NAME */}
        <label htmlFor="name" className={labelClasses}>
          Your Name
        </label>
        <input
          id="name"
          name="name"
          required
          type="text"
          placeholder="e.g., Jane Doe"
          value={formData.name}
          onChange={handleChange}
          className={inputClasses}
        />

        {/* EMAIL */}
        <label htmlFor="email" className={labelClasses}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="yourname@example.com"
          value={formData.email}
          onChange={handleChange}
          className={inputClasses}
        />

        {/* MESSAGE */}
        <label htmlFor="message" className={labelClasses}>
          Project Details or Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Describe your project or inquiry..."
          value={formData.message}
          onChange={handleChange}
          className={inputClasses}
        />

        {/* SUBMIT BUTTON */}
        <motion.button
          type="submit"
          aria-label="Send message"
          className="mt-8 w-full flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold text-lg transition-all duration-300 shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <ContactIcon svgPath={mailPath} />
          Send Message Signal
        </motion.button>
      </motion.form>

      {/* FOOTER */}
      <motion.footer
        className={`mt-16 text-sm ${textColor}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        © {new Date().getFullYear()} Yash Sheorey · All Systems Operational
      </motion.footer>
    </section>
  );
};

export default Contact;
