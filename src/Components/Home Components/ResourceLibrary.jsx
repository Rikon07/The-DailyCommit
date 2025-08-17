"use client";

import { motion } from "framer-motion";
import { FaBook, FaLaptopCode, FaBrain, FaTools } from "react-icons/fa";

const resources = [
  {
    icon: <FaBook className="text-3xl text-[#38BDF8]" />,
    title: "Latest Research",
    description: "Read cutting-edge CS papers and findings from around the globe.",
    href: "https://arxiv.org/cs",
  },
  {
    icon: <FaLaptopCode className="text-3xl text-[#38BDF8]" />,
    title: "MDN Web Docs",
    description: "Explore detailed documentation and guides for web technologies.",
    href: "https://developer.mozilla.org/",
  },
  {
    icon: <FaBrain className="text-3xl text-[#38BDF8]" />,
    title: "freeCodeCamp",
    description: "Access free coding tutorials, projects, and full learning paths.",
    href: "https://www.freecodecamp.org/",
  },
  {
    icon: <FaTools className="text-3xl text-[#38BDF8]" />,
    title: "GitHub Trending",
    description: "Check what developers around the world are building right now.",
    href: "https://github.com/trending",
  },
];

export default function ResourceLibrary() {
  return (
    <section className="w-full py-16 px-6 bg-[#D0E7F9]/30 dark:bg-[#0F172A] border-t border-[#38BDF8]/20 cabin">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#223A5E] dark:text-white"
        >
          Resource Library
        </motion.h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((item, idx) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.97 }}
              className="p-6 rounded-2xl shadow-md bg-white/80 dark:bg-[#1E293B] backdrop-blur-lg 
                         hover:shadow-2xl hover:bg-white dark:hover:bg-[#0F172A]/70 
                         transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                {item.icon}
                <h3 className="text-lg font-semibold mt-4 mb-2 text-[#223A5E] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-[#334155] dark:text-gray-300">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 text-sm font-medium text-[#38BDF8] hover:text-[#0EA5E9] transition">
                Explore →
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
