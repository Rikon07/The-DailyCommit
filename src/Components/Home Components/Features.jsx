"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPenNib, FaNewspaper, FaStar, FaChartBar } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const features = [
  {
    Icon: FaPenNib,
    name: "Write Articles",
    description:
      "Share your knowledge, insights, and news with the global developer community in seconds.",
    href: "/add-article",
    cta: "Start Writing",
    className: "lg:col-span-2",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/20 to-[#D0E7F9]/30 dark:from-[#223A5E]/40 dark:to-[#0F172A]/40" />
    ),
  },
  {
    Icon: FaNewspaper,
    name: "Dev Newses",
    description:
      "Stay updated with the latest in computer science, open source, and tech trends.",
    href: "/articles",
    cta: "Read News",
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-[#0EA5E9]/10 dark:from-[#223A5E]/20 dark:to-[#0F172A]/20" />
    ),
  },
  {
    Icon: FaStar,
    name: "Premium Content",
    description:
      "Unlock premium articles, priority publishing, and more with a subscription.",
    href: "#plans",
    cta: "Go Premium",
    scroll: true,
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 to-white/10 dark:from-[#0EA5E9]/30 dark:to-[#0F172A]/20" />
    ),
  },
  {
    Icon: FaChartBar,
    name: "Real-Time Analytics",
    description:
      "Track your article views, engagement, and community impact instantly.",
    href: null,
    cta: null,
    className: "lg:col-span-1",
    background: (
      <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/10 to-[#0EA5E9]/10 dark:from-[#223A5E]/20 dark:to-[#0F172A]/20" />
    ),
  },
];

export default function Features() {
  // smooth scroll handler
  const handleScroll = (e) => {
  e.preventDefault();
  const target = document.querySelector("#plans");
  if (target) {
    target.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <section className="w-full cabin py-16 px-6 bg-[#D0E7F9]/30 dark:bg-[#0F172A] border-t border-[#38BDF8]/20 font-cabin">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-center mb-4 text-[#223A5E] dark:text-white"
        >
          Explore Our Features
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 auto-rows-[200px]">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition group p-6 flex flex-col justify-between ${feature.className}`}
            >
              {feature.background}
              <div className="relative z-10">
                <feature.Icon className="text-3xl text-[#38BDF8] dark:text-[#38BDF8] mb-3 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-[#223A5E] dark:text-white mb-2">
                  {feature.name}
                </h3>
                <p className="text-sm text-[#334155] dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Link CTA (no button, arrow style) */}
              {feature.href && feature.cta && (
                <div className="relative z-10 mt-4">
                  {feature.scroll ? (
                    <a
                      href={feature.href}
                      onClick={handleScroll}
                      className="inline-flex items-center text-sm font-medium text-[#38BDF8] hover:text-[#0EA5E9] transition"
                    >
                      {feature.cta}
                      <HiArrowRight className="ml-1" />
                    </a>
                  ) : (
                    <Link
                      to={feature.href}
                      className="inline-flex items-center text-sm font-medium text-[#38BDF8] hover:text-[#0EA5E9] transition"
                    >
                      {feature.cta}
                      <HiArrowRight className="ml-1" />
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
