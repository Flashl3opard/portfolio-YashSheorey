"use client";

import { ThemeProvider } from "./ThemeContext"; // Adjust path if needed
import ThemeToggle from "./ThemeToggle";
import Navbar from "./Navbar";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ThemeToggle />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ThemeProvider>
  );
}
