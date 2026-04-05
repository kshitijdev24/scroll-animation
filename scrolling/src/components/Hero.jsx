import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    // Use gsap.context for easy cleanup in React
    let ctx = gsap.context(() => {
      // --- INITIAL LOAD ANIMATION ---
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
      })
        .from(
          ".stat-card",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
          },
          "-=0.5",
        )
        .from(
          visualRef.current,
          {
            scale: 0.5,
            opacity: 0,
            duration: 1.5,
          },
          "-=1",
        );

      // --- SCROLL-BASED ANIMATION ---
      // This animates the background object based on scroll progress
      gsap.to(visualRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5, // Natural smoothing/interpolation
        },
        y: 200, // Move down
        rotate: 30, // Spin slightly
        scale: 1.2, // Grow
      });

      // Fade out headline as we scroll down
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "50% top",
          scrub: true,
        },
        opacity: 0,
        y: -100,
      });
    }, sectionRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  const headline = ["WELCOME", "ITZ FIZZ"];
  const stats = [
    { value: "99%", label: "Uptime" },
    { value: "50ms", label: "Latency" },
    { value: "1.2M", label: "Requests" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center bg-zinc-950 text-white overflow-hidden"
    >
      {/* 3. The Visual Element (Scroll Reactive) */}
      <div
        ref={visualRef}
        className="absolute w-72 h-72 md:w-125 md:h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-[80px] opacity-30 z-0"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* 1. Letter Spaced Headline */}
        <h1
          ref={headlineRef}
          className="text-3xl md:text-6xl lg:text-8xl font-black tracking-[1.2em] mr-[-1.2em] flex flex-col items-center justify-center"
        >
          {headline.map((line, lineIndex) => (
            <div key={lineIndex} className="flex flex-wrap justify-center">
              {line.split("").map((char, i) => (
                <span key={i} className="char inline-block">
                  {char}
                </span>
              ))}
            </div>
          ))}
        </h1>

        {/* 2. Impact Metrics */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
          {stats.map((item, idx) => (
            <div key={idx} className="stat-card flex flex-col">
              <span className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
                {item.value}
              </span>
              <span className="text-xs md:text-sm uppercase tracking-[0.4em] text-zinc-500 mt-2">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 text-[10px] uppercase tracking-[0.5em] animate-pulse">
        Scroll to Explore
      </div>
    </section>
  );
};

export default Hero;
