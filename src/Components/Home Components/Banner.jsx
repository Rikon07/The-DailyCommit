import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowDown, FaFire, FaGlobe, FaCode } from "react-icons/fa6";
import clsx from "clsx";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";

const headlines = [
  "Stay Ahead with Global Dev News",
  "Code Smarter, Read Faster",
  "Push Knowledge. Pull Headlines.",
  "Your Daily Dose of CS & Tech News",
  "Articles by Developers, for Developers",
  "Explore Open Source Breakthroughs",
  "Daily Commits from the World of Tech",
];

const typewriterLines = [
  "Powered by Devs, Loved by Readers",
  "One Platform. Infinite Commits.",
  "Where Code Meets Community",
  "Your Source for Real-Time CS News",
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const bannerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      bannerRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  // Scroll to the next section
  const scrollToSection = () => {
    const nextSection = document.getElementById("trending");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={bannerRef}
      className="relative w-full min-h-[92vh] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://i.pinimg.com/originals/6a/e0/9d/6ae09d56f3894692b0c0c735a9882916.gif"
          alt="News background"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-[#D0E7F9]/60 dark:from-[#0F172A]/80 dark:to-[#0F172A]/80 backdrop-blur-sm"></div>
      </div>

      {/* Floating icons for extra animation */}
      <motion.div
        className="absolute left-10 top-24 z-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.1 }}
        transition={{ delay: 0.5, duration: 1.2, type: "spring" }}
      >
        <FaFire className="text-[#38BDF8] text-4xl animate-pulse" />
      </motion.div>
      <motion.div
        className="absolute right-10 top-24 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 0.2 }}
        transition={{ delay: 0.7, duration: 1.8, type: "spring" }}
      >
        <FaGlobe className="text-[#0EA5E9] text-3xl animate-spin" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 bottom-36 md:bottom-44 lg:bottom-62 z-10"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ delay: 1, duration: 1.2, type: "spring" }}
      >
        <FaCode className="text-[#38BDF8] text-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl px-4">
        {/* Rotating Headline */}
        <div className="text-4xl sm:text-5xl md:text-6xl font-light cabin leading-tight text-[#0F172A]/80 dark:text-white h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={headlines[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="transition-all duration-300"
            >
              {headlines[index].split(" ").map((word, i) => (
                <span
                  key={i}
                  className={clsx("inline-block", {
                    "text-[#38BDF8]": [
                      "news",
                      "developers",
                      "open",
                      "source",
                      "global",
                      "read",
                      "knowledge.",
                      "devs",
                      "tech",
                      "commits",
                    ].includes(word.toLowerCase()),
                  })}
                >
                  {word}{" "}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Typewriter Extra Line */}
        <div className="mt-4 text-xl md:text-2xl font-light text-[#475569] dark:text-[#CBD5E1]">
          <Typewriter
            words={typewriterLines}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </div>

        {/* Description */}
        <p className="mt-6 text-sm md:text-base text-[#334155] dark:text-[#94A3B8] max-w-xl mx-auto font-light">
          The Daily Commit brings you real-time computer science news,
          open-source breakthroughs, and developer-driven insights from around
          the globe — every day.
        </p>

        {/* Trending Button */}
        {/* <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToSection}
            className="relative inline-flex items-center gap-2 px-8 py-3 font-semibold text-white bg-gradient-to-tr from-[#38BDF8] via-[#0EA5E9] to-[#38BDF8] rounded-full shadow-lg hover:scale-105 transition-all"
          >
            <FaFire className="text-yellow-400 animate-pulse" />
            <span>See What’s Trending</span>
          </button>
        </div> */}
      </div>

      {/* Scroll Icon */}
      <div
        className="absolute left-1/2 bottom-8 z-10 cursor-pointer"
        onClick={scrollToSection}
      >
        <FaArrowDown className="text-[#38BDF8] animate-bounce text-xl" />
      </div>
    </section>
  );
};

export default Banner;
