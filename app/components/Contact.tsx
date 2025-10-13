"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion } from "framer-motion";

// Inline SVG Icon Component
interface IconProps {
  svgPath: string;
  size?: number;
  className?: string;
}

const ContactIcon: React.FC<IconProps> = ({
  svgPath,
  size = 24, // Use a fixed size in pixels for clean SVG rendering
  className = "text-white",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 ${className}`} // Tailwind w-6/h-6 translates to 24px
  >
    <path d={svgPath} />
  </svg>
);

const mailPath =
  "M2.003 5.464c0-.66.536-1.196 1.196-1.196h17.602c.66 0 1.196.536 1.196 1.196V18.54c0 .66-.536 1.196-1.196 1.196H3.2c-.66 0-1.197-.536-1.197-1.196zm2.25 1.19l7.747 5.097 7.74-5.094a.695.695 0 00-.776-1.178L12 11.233 4.257 5.385a.695.695 0 10-.775 1.178z";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const inputClasses =
    "w-full p-4 text-gray-200 bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-fuchsia-400/80 placeholder:text-gray-400 transition-all duration-300";
  const labelClasses =
    "block text-sm font-medium text-gray-300 mb-2 mt-4 select-none";

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 flex flex-col items-center px-6 z-10 overflow-hidden"
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
        className="text-gray-300 text-lg md:text-xl max-w-2xl text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Ready to build something extraordinary? Send a signal and let's discuss
        your next **cosmic creation**.
      </motion.p>

      {/* Contact Form (Glass Card) */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-4xl p-8 md:p-12 bg-white/5 backdrop-blur-xl border border-fuchsia-500/20 rounded-3xl shadow-2xl shadow-fuchsia-500/20 hover:shadow-3xl hover:shadow-cyan-500/30 transition-all duration-500"
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

        {/* Bolder, Full-Width Button */}
        <motion.button
          type="submit"
          className="mt-8 w-full flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold text-lg transition-all duration-300 shadow-xl shadow-fuchsia-500/40 hover:shadow-cyan-500/60 hover:scale-[1.01] active:scale-[0.99]"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <ContactIcon svgPath={mailPath} className="text-white" />
          Send Message Signal
        </motion.button>
      </motion.form>

      {/* Footer */}
      <motion.footer
        className="mt-20 text-sm text-gray-500"
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
