"use client";

import React, {
  useState,
  useRef,
  FormEvent,
  ChangeEvent,
  useEffect,
} from "react";
import {
  motion,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";
import {
  FaPaperPlane,
  FaGlobeAmericas,
  FaShieldAlt,
  FaWifi,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";

/* -----------------------------------------
   Types
--------------------------------------------*/
interface FormDataType {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  { name: "GitHub", url: "https://github.com/Flashl3opard" },
  { name: "LinkedIn", url: "https://linkedin.com/in/yash-sheorey" },
  { name: "Twitter", url: "https://x.com/flashl3opard" },
];

/* -----------------------------------------
   Holographic Input Component
--------------------------------------------*/
const HoloInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  darkMode,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  darkMode: boolean;
  required?: boolean;
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative group mb-6">
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          focused || value
            ? "-top-6 text-xs font-bold tracking-widest"
            : "top-3 text-sm"
        } ${darkMode ? "text-cyan-400" : "text-blue-600"}`}
      >
        {label.toUpperCase()}
      </label>

      {/* Background glow on focus */}
      <div
        className={`absolute inset-0 blur-lg transition-opacity duration-500 ${
          focused ? "opacity-20" : "opacity-0"
        } ${darkMode ? "bg-cyan-400" : "bg-blue-500"}`}
      />

      {type === "textarea" ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          rows={4}
          className={`w-full bg-transparent border-b-2 py-3 px-4 outline-none transition-colors duration-300 resize-none relative z-10 ${
            darkMode
              ? "text-white border-gray-700 focus:border-cyan-400"
              : "text-slate-900 border-gray-300 focus:border-blue-600"
          }`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          className={`w-full bg-transparent border-b-2 py-3 px-4 outline-none transition-colors duration-300 relative z-10 ${
            darkMode
              ? "text-white border-gray-700 focus:border-cyan-400"
              : "text-slate-900 border-gray-300 focus:border-blue-600"
          }`}
        />
      )}

      {/* Animated Scanning Line */}
      <div
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ${
          focused ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />
    </div>
  );
};

/* -----------------------------------------
   Main Contact Component
--------------------------------------------*/
const Contact: React.FC = () => {
  const { darkMode } = useTheme();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  // 3D Tilt Logic
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = (mouseY / height - 0.5) * -10; // Tilt X
    const rY = (mouseX / width - 0.5) * 10; // Tilt Y

    rotateX.set(rX);
    rotateY.set(rY);
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    // Simulate Network Request
    setTimeout(() => {
      const { name, email, message } = formData;
      const mailto = `mailto:yashsheorey@gmail.com?subject=${encodeURIComponent(
        `Cosmic Inquiry: ${name}`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      window.location.href = mailto;
      setStatus("sent");

      // Reset after delay
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", message: "" });
      }, 3000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className={`relative w-full min-h-screen flex items-center justify-center py-24 px-4 overflow-hidden transition-colors duration-700 ${
        darkMode ? "bg-[#050510]" : "bg-gray-50"
      }`}
      onMouseMove={handleMouseMove}
    >
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] ${
            darkMode ? "opacity-20" : "opacity-40"
          }`}
        />

        {/* Floating Orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-20 left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]"
        />
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="w-full max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Initialize{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              Uplink
            </span>
          </h2>
          <p
            className={`mt-4 text-lg ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Transmit your signal across the network.
          </p>
        </motion.div>

        {/* --- 3D CONSOLE --- */}
        <motion.div
          ref={cardRef}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="w-full perspective-1000"
        >
          <div
            className={`relative grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 border ${
              darkMode
                ? "bg-[#0a0a12]/80 border-white/10 shadow-cyan-500/10"
                : "bg-white/90 border-gray-200 shadow-blue-500/20"
            } backdrop-blur-xl`}
          >
            {/* Spotlight FX */}
            <motion.div
              style={{
                background: useMotionTemplate`
                    radial-gradient(
                        600px circle at ${x}px ${y}px,
                        ${
                          darkMode
                            ? "rgba(6,182,212,0.1)"
                            : "rgba(59,130,246,0.1)"
                        },
                        transparent 80%
                    )
                    `,
              }}
              className="absolute inset-0 pointer-events-none z-0"
            />

            {/* LEFT: STATUS HUD (2 Cols) */}
            <div
              className={`relative z-10 lg:col-span-2 p-8 md:p-12 flex flex-col justify-between overflow-hidden ${
                darkMode
                  ? "bg-gradient-to-br from-cyan-950/50 to-black/50"
                  : "bg-gradient-to-br from-blue-50 to-white"
              }`}
            >
              {/* Scanning Line for HUD */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative w-3 h-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </div>
                  <span
                    className={`font-mono text-sm tracking-widest ${
                      darkMode ? "text-cyan-400" : "text-blue-600"
                    }`}
                  >
                    SYSTEM ONLINE
                  </span>
                </div>

                <h3
                  className={`text-3xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Transmission Hub
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        darkMode
                          ? "bg-white/5 text-cyan-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <div
                        className={`text-xs font-mono ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        CURRENT LOCATION
                      </div>
                      <div
                        className={`font-bold ${
                          darkMode ? "text-gray-200" : "text-slate-700"
                        }`}
                      >
                        Jabalpur, India
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${
                        darkMode
                          ? "bg-white/5 text-cyan-400"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      <FaEnvelope />
                    </div>
                    <div>
                      <div
                        className={`text-xs font-mono ${
                          darkMode ? "text-gray-500" : "text-gray-400"
                        }`}
                      >
                        DIRECT LINK
                      </div>
                      <div
                        className={`font-bold ${
                          darkMode ? "text-gray-200" : "text-slate-700"
                        }`}
                      >
                        sheoreyyash@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decoration: Radar */}
              <div className="mt-12">
                <div className="flex items-center justify-between text-xs font-mono mb-2 opacity-60">
                  <span>ENCRYPTION: AES-256</span>
                  <span>SIGNAL: 100%</span>
                </div>
                <div className="flex gap-4 mt-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`text-sm hover:underline ${
                        darkMode ? "text-cyan-400" : "text-blue-600"
                      }`}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: FORM (3 Cols) */}
            <div className="relative z-10 lg:col-span-3 p-8 md:p-12">
              <form
                onSubmit={handleSubmit}
                className="relative h-full flex flex-col justify-center"
              >
                <HoloInput
                  label="Identify Yourself"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  darkMode={darkMode}
                />
                <HoloInput
                  label="Frequency (Email)"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  darkMode={darkMode}
                />
                <HoloInput
                  label="Data Packet (Message)"
                  name="message"
                  type="textarea"
                  value={formData.message}
                  onChange={handleChange}
                  darkMode={darkMode}
                />

                {/* Submit Button Area */}
                <div className="mt-8 relative">
                  <AnimatePresence mode="wait">
                    {status === "idle" && (
                      <motion.button
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 rounded-lg font-bold text-lg tracking-widest uppercase transition-all shadow-lg hover:shadow-cyan-500/40 ${
                          darkMode
                            ? "bg-gradient-to-r from-cyan-600 to-purple-600 text-white"
                            : "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-3">
                          <FaPaperPlane /> Initiate Uplink
                        </span>
                      </motion.button>
                    )}

                    {status === "sending" && (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`w-full py-4 rounded-lg font-mono text-center border ${
                          darkMode
                            ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
                            : "border-blue-500/30 bg-blue-50 text-blue-600"
                        }`}
                      >
                        <div className="flex items-center justify-center gap-3">
                          <FaWifi className="animate-pulse" /> ESTABLISHING
                          CONNECTION...
                        </div>
                        <div className="h-1 w-full bg-gray-700 mt-3 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-400 animate-progress" />
                        </div>
                      </motion.div>
                    )}

                    {status === "sent" && (
                      <motion.div
                        key="sent"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full py-4 rounded-lg bg-green-500 text-white font-bold text-center flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
                      >
                        <FaCheckCircle className="text-xl" /> TRANSMISSION
                        COMPLETE
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-center mt-16 font-mono text-xs ${
            darkMode ? "text-gray-600" : "text-gray-400"
          }`}
        >
          SECURE CHANNEL ESTABLISHED // {new Date().getFullYear()} YASH SHEOREY
        </motion.div>
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Contact;
