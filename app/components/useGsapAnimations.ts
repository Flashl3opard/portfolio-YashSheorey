"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function useGsapAnimations() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // === Fade-in sections on scroll ===
    gsap.utils.toArray<HTMLElement>("section").forEach((section, i) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // === Floating/parallax elements ===
    gsap.utils.toArray<HTMLElement>(".parallax").forEach((el) => {
      gsap.to(el, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          scrub: true,
        },
      });
    });

    // === Background glow ===
    gsap.to(".page-bg", {
      backgroundPosition: "50% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.globalTimeline.clear();
    };
  }, []);
}
