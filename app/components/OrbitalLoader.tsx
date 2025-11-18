"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ---------------------------------------------------
   TEXT SCRAMBLER (Matrix Effect)
--------------------------------------------------- */
const ScrambleText = ({
  text,
  className,
  speed = 30,
}: {
  text: string;
  className?: string;
  speed?: number;
}) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&XΩΣΠ";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{display}</span>;
};

/* ---------------------------------------------------
   CSS 3D CUBE GENERATOR
--------------------------------------------------- */
const Cube = ({
  size,
  color,
  duration,
  reverse = false,
}: {
  size: number;
  color: string;
  duration: number;
  reverse?: boolean;
}) => {
  const faces = [
    { transform: `rotateX(0deg) translateZ(${size / 2}px)`, label: "FRONT" },
    { transform: `rotateX(180deg) translateZ(${size / 2}px)`, label: "BACK" },
    { transform: `rotateY(90deg) translateZ(${size / 2}px)`, label: "RIGHT" },
    { transform: `rotateY(-90deg) translateZ(${size / 2}px)`, label: "LEFT" },
    { transform: `rotateX(90deg) translateZ(${size / 2}px)`, label: "TOP" },
    { transform: `rotateX(-90deg) translateZ(${size / 2}px)`, label: "BOTTOM" },
  ];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <motion.div
        animate={{
          rotateX: reverse ? [360, 0] : [0, 360],
          rotateY: reverse ? [360, 0] : [0, 360],
          rotateZ: reverse ? [180, 0] : [0, 180],
        }}
        transition={{
          duration: duration,
          ease: "linear",
          repeat: Infinity,
        }}
        className="relative preserve-3d"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
        }}
      >
        {faces.map((face, i) => (
          <div
            key={i}
            className={`absolute inset-0 border-[1px] ${color} backdrop-blur-[1px] flex items-center justify-center opacity-60`}
            style={{
              transform: face.transform,
              backfaceVisibility: "visible",
            }}
          >
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/* ---------------------------------------------------
   AUDIO BARS SIMULATOR
--------------------------------------------------- */
const AudioBars = () => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 items-end h-16 opacity-50">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ height: [10, 40, 10] }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1,
          }}
          className="w-1 bg-cyan-500"
        />
      ))}
    </div>
  );
};

/* ---------------------------------------------------
   MAIN COMPONENT
--------------------------------------------------- */
const OrbitalLoader = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set(clientX / innerWidth - 0.5);
    y.set(clientY / innerHeight - 0.5);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[9999] bg-[#050011] flex items-center justify-center overflow-hidden font-mono text-cyan-500 cursor-none"
    >
      {/* --- SCANLINES & GLITCH OVERLAY --- */}
      <div className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay opacity-20">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#000_3px)]" />
      </div>

      {/* --- BACKGROUND MATRIX GRID --- */}
      <div className="absolute inset-0 pointer-events-none perspective-grid">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #00f3ff 1px, transparent 1px), linear-gradient(to bottom, #ff00ff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform:
              "perspective(500px) rotateX(60deg) translateY(-100px) scale(3)",
            animation: "gridMove 5s linear infinite",
          }}
        />
      </div>

      {/* --- MAIN HUD CONTAINER (TILTS WITH MOUSE) --- */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex items-center justify-center scale-75 md:scale-100 perspective-container"
      >
        {/* 1. Outer Gyroscope Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border-[1px] border-dashed border-slate-800"
        >
          <div className="absolute top-0 left-1/2 w-4 h-4 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-slate-800 rounded-full -translate-x-1/2 translate-y-1/2" />
        </motion.div>

        {/* 2. Data Ring (Cyan) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] rounded-full border-[1px] border-cyan-900/50 border-l-cyan-400 border-r-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
        >
          {/* Orbiting Data Blips */}
          <div className="absolute top-1/2 left-0 w-2 h-10 bg-cyan-400 -translate-y-1/2 -translate-x-1/2 blur-[2px]" />
          <div className="absolute top-1/2 right-0 w-2 h-10 bg-cyan-400 -translate-y-1/2 translate-x-1/2 blur-[2px]" />
        </motion.div>

        {/* 3. Energy Ring (Pink) */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.02, 1] }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity },
          }}
          className="absolute w-[380px] h-[380px] rounded-full border-[4px] border-transparent border-t-pink-600 border-b-purple-600 opacity-80"
        />

        {/* 4. Scanner Beam */}
        <div className="absolute w-[400px] h-[400px] overflow-hidden rounded-full opacity-30 pointer-events-none">
          <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[20px] bg-cyan-400 blur-md shadow-[0_0_20px_#00f3ff]"
          />
        </div>

        {/* --- THE TESSERACT CORE --- */}
        <div className="relative z-10 w-64 h-64 flex items-center justify-center">
          {/* Outer Shell */}
          <Cube
            size={120}
            color="border-cyan-500/40 bg-cyan-500/5"
            duration={10}
          />

          {/* Middle Shell */}
          <Cube
            size={80}
            color="border-pink-500/40 bg-pink-500/5"
            duration={6}
            reverse
          />

          {/* Inner Core */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-8 h-8 bg-white rounded shadow-[0_0_50px_#fff]"
          />
        </div>
      </motion.div>

      {/* --- UI HUD LAYER --- */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4 z-20 w-full px-4">
        {/* Audio Viz & Text */}
        <div className="relative w-full max-w-md flex justify-between items-end pb-2 border-b border-slate-800">
          <div className="text-xs text-cyan-700 font-bold">
            <ScrambleText text="NEURAL_LINK_ESTABLISHED" />
          </div>
          <AudioBars />
          <div className="text-xs text-pink-700 font-bold">
            <ScrambleText text="SYNC_RATE: 99.9%" />
          </div>
        </div>

        {/* Status Text */}
        <div className="flex items-center gap-3 text-2xl md:text-4xl font-black tracking-tighter text-white">
          <span className="text-cyan-400">{">"}</span>
          <ScrambleText
            text="INITIALIZING_CORE"
            speed={50}
            className="glitch-text"
          />
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="w-4 h-8 bg-cyan-400 block"
          />
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xl h-2 bg-slate-900 border border-slate-700 rounded-sm overflow-hidden relative mt-4">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4.5, ease: "circInOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-white shadow-[0_0_20px_rgba(0,243,255,0.8)]"
          />
          {/* Striped overlay */}
          <div className="absolute inset-0 w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#000_10px,#000_12px)] opacity-30" />
        </div>

        <div className="flex justify-between w-full max-w-xl text-[9px] text-slate-500 font-mono uppercase tracking-widest mt-1">
          <span>SECURE_CONNECTION</span>
          <span>ENCRYPTED::SHA-256</span>
        </div>
      </div>

      {/* --- GLOBAL STYLES --- */}
      <style jsx>{`
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 0 60px;
          }
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .perspective-grid {
          perspective: 1000px;
        }
        .glitch-text {
          text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
        }
      `}</style>
    </div>
  );
};

export default OrbitalLoader;
