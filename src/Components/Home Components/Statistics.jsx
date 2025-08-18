import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import CountUp from "react-countup";
import { FaUsers, FaUserCheck, FaStar, FaNewspaper } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function Statistics() {
  const axiosSecure = useAxiosSecure();
  const statsRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power2.out" }
    );
  }, []);

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/statistics/users");
      return res.data;
    },
  });

  const cards = [
    {
      label: "All Users",
      value: stats.totalUsers || 0,
      icon: <FaUsers className="text-3xl text-[#38BDF8]" />,
      bg: "bg-white dark:bg-[#223A5E]",
      border: "border-[#38BDF8]",
    },
    {
      label: "Premium Users",
      value: stats.premiumUsers || 0,
      icon: <FaUserCheck className="text-3xl text-yellow-400" />,
      bg: "bg-gradient-to-br from-[#38BDF8]/20 to-white dark:from-[#223A5E]/60 dark:to-[#0F172A]",
      border: "border-yellow-400",
    },
    {
      label: "All Articles",
      value: stats.totalArticles || 0,
      icon: <FaNewspaper className="text-3xl text-[#0EA5E9]" />,
      bg: "bg-white dark:bg-[#223A5E]",
      border: "border-[#0EA5E9]",
    },
    {
      label: "Premium Articles",
      value: stats.premiumArticles || 0,
      icon: <FaStar className="text-3xl text-yellow-400" />,
      bg: "bg-gradient-to-br from-yellow-200/30 to-white/10 dark:from-yellow-900/20 dark:to-[#0F172A]/20",
      border: "border-yellow-400",
    },
  ];

  return (
    <div ref={statsRef} className="bg-[#D0E7F9]/30 dark:bg-[#0F172A] border-t border-[#38BDF8]/20">
      <section className="max-w-5xl cabin mx-auto py-12 md:py-15 px-3 md:px-6">
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F172A] dark:text-[#D0E7F9]">
            Platform Statistics
          </h2>
          <p className="text-[#475569] dark:text-[#94A3B8] mt-2 text-sm lg:text-base text-center">
            Users and Articles at a Glance
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-2xl shadow-xl p-4 flex flex-col items-center hover:scale-105 transition-transform duration-200 border-1 ${card.bg} ${card.border}`}
            >
              <div className="mb-4">{card.icon}</div>
              <div className="text-2xl md:text-4xl font-extrabold text-[#38BDF8] dark:text-yellow-400 mb-2">
                {isLoading ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <CountUp end={card.value} duration={2} separator="," />
                )}
              </div>
              <div className="text-lg font-semibold text-[#0F172A] dark:text-[#D0E7F9]">{card.label}</div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}