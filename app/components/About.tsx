"use client";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e] text-white overflow-hidden"
    >
      {/* 🔮 Floating Glows */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[150px] animate-pulse delay-3000"></div>
      </div>

      {/* 🌟 Header */}
      <motion.h2
        className="text-4xl md:text-6xl font-extrabold mb-8 bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-violet-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,255,255,0.3)]"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* Glassy Card for Text */}
      <motion.div
        className="relative z-10 max-w-3xl bg-white/10 backdrop-blur-2xl border border-cyan-400/30 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,255,255,0.2)]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
          I’m <span className="text-cyan-400 font-semibold">Yash Sheorey</span>,
          a passionate <span className="text-cyan-400">Frontend Developer</span>{" "}
          and
          <span className="text-cyan-400"> IoT Enthusiast</span> who blends
          technology and creativity to build immersive digital experiences. I
          focus on futuristic UI design, performance, and elegant user
          interactions.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
