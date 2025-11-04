"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;

    if (!container || !glow) return;

    // Timeline for smooth scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.2,
      },
    });

    // Animate background glow movement
    tl.fromTo(
      glow,
      {
        opacity: 0.2,
        scale: 0.8,
        filter: "blur(100px)",
      },
      {
        opacity: 0.8,
        scale: 1.3,
        filter: "blur(180px)",
        ease: "power2.out",
      }
    );

    // Animate background gradient shift
    gsap.to(container, {
      backgroundPosition: "200% center",
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] overflow-hidden flex justify-center items-center bg-gradient-to-br from-[#050510] via-[#0b0f25] to-[#09172e] text-white"
    >
      {/* glowing animated orb */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-violet-500 rounded-full opacity-40 blur-[150px]"
      />
      {/* optional overlay text */}
      <h2 className="text-4xl md:text-6xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent z-10">
        Scroll Down
      </h2>
    </div>
  );
};

export default ScrollTransition;
