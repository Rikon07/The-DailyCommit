import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowDown } from "react-icons/fa6";
import clsx from "clsx";
import { Typewriter } from "react-simple-typewriter";
import gsap from "gsap";

const headlines = [
  "Stay Ahead With Dev News",
  "Code Smarter, Read Faster",
  "Push Knowledge. Pull Headlines.",
  "Your Daily Dose of Developer News",
  "Articles Written by Devs, for Devs",
  "Explore Open Source Stories",
  "Daily Commits from Global Devs",
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
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  const scrollToSection = () => {
    const nextSection = document.getElementById("news-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={bannerRef}
      className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src='https://i.pinimg.com/originals/6a/e0/9d/6ae09d56f3894692b0c0c735a9882916.gif'
          // src="https://i.pinimg.com/originals/68/0b/eb/680beb29a683b6624393df56ac23e9bf.gif"
        //   https://i.pinimg.com/originals/86/e9/db/86e9db1eba21c663ccd6ee49a146503f.gif
          alt="News background"
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-white/60 dark:bg-[#0F172A]/80 backdrop-blur-sm"></div>
      </div>

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
                      "devs"
                    ].includes(word.toLowerCase()),
                  })}
                >
                  {word} {" "}
                </span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Typewriter Extra Line */}
        <div className="mt-4 text-lg sm:text-xl md:text-2xl font-light text-[#475569] dark:text-[#CBD5E1]">
          <Typewriter
            words={[
              "Powered by Devs, Loved by Readers",
              "One Platform. Infinite Commits.",
              "Where Code Meets Community",
            ]}
            loop={true}
            cursor
            cursorStyle="_"
            typeSpeed={60}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </div>

        {/* Description */}
        <p className="mt-6 text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] max-w-xl mx-auto font-light">
          The Daily Commit brings you real-time dev news, open-source stories,
          and developer-driven insights from around the globe — every single day.
        </p>

        {/* Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={scrollToSection}
            className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-white text-sm px-8 py-2 rounded-full sfpro shadow transition"
          >
            🔍 Discover
          </button>
          {/* <button className="relative inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-50 bg-gradient-to-tr from-slate-900/30 via-slate-900/70 to-slate-900/30 ring-4 ring-slate-900/20 rounded-full overflow-hidden hover:opacity-90 transition-opacity before:absolute before:top-4 before:left-1/2 before:-translate-x-1/2 before:w-[100px] before:h-[100px] before:rounded-full before:bg-gradient-to-b before:from-slate-50/10 before:blur-xl">
      Explore discoveries
    </button> */}
        </div>
      </div>

      {/* Scroll Icon */}
      <div className="absolute bottom-8 z-10 cursor-pointer" onClick={scrollToSection}>
        <FaArrowDown className="text-[#38BDF8] animate-bounce text-xl" />
      </div>
    </section>
  );
};

export default Banner;
