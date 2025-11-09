"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext"; // ✅ Import Theme Context

// -------------------------
// Icon Component
// -------------------------
interface IconProps {
  svgPath: string;
  className?: string;
}

const ContactIcon: React.FC<IconProps> = ({ svgPath, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
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
// Contact Component
// -------------------------
interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const { darkMode } = useTheme(); // ✅ Theme hook
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:yashsheorey@gmail.com?subject=${encodeURIComponent(
      `Portfolio Inquiry: ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
    setFormData({ name: "", email: "", message: "" });
  };

  // -------------------------
  // Theme-aware Classes
  // -------------------------
  const inputClasses = `w-full p-4 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 placeholder:text-gray-400
    ${
      darkMode
        ? "bg-white/5 text-gray-200 border border-cyan-400/30 focus:ring-fuchsia-400/80"
        : "bg-white/70 text-gray-800 border border-fuchsia-400/30 focus:ring-cyan-400/80"
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
      {/* Section Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold text-center mb-6 md:mb-8 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
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
        Ready to build something extraordinary? Send a signal and let's discuss
        your next <strong>cosmic creation</strong>.
      </motion.p>

      {/* Form Card */}
      <motion.form
        onSubmit={handleSubmit}
        className={`relative z-10 w-full max-w-4xl p-8 md:p-12 rounded-3xl backdrop-blur-xl border transition-all duration-500 shadow-2xl ${
          darkMode
            ? "bg-white/5 border-fuchsia-500/20 shadow-fuchsia-500/20 hover:shadow-cyan-500/30"
            : "bg-white/80 border-cyan-500/30 shadow-cyan-500/20 hover:shadow-fuchsia-500/30"
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <div className="relative">
          <label htmlFor="name" className={labelClasses}>
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="e.g., Jane Doe"
            className={inputClasses}
          />
        </div>

        <div className="relative">
          <label htmlFor="email" className={labelClasses}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="yourname@example.com"
            className={inputClasses}
          />
        </div>

        <div className="relative">
          <label htmlFor="message" className={labelClasses}>
            Project Details or Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Describe your project or inquiry..."
            className={inputClasses}
          />
        </div>

        <motion.button
          type="submit"
          className="mt-8 w-full flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-fuchsia-500/40 hover:shadow-cyan-500/60 hover:scale-[1.01] active:scale-[0.99]"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ContactIcon svgPath={mailPath} className="text-white" />
          Send Message Signal
        </motion.button>
      </motion.form>

      {/* Footer */}
      <motion.footer
        className={`mt-20 text-sm ${textColor}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        &copy; {new Date().getFullYear()} Yash Sheorey | All Systems Operational
      </motion.footer>
    </section>
  );
};

export default Contact;
