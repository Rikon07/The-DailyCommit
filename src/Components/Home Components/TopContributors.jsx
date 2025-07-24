import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa6";
import { useRef, useEffect } from "react";
import gsap from "gsap";
export default function TopContributors() {
  const axiosSecure = useAxiosSecure();
const contribRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      contribRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: "power2.out" }
    );
  }, []);

  // Fetch top contributors
  const { data: contributors = [], isLoading } = useQuery({
    queryKey: ["top-contributors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contributors/top");
      return res.data;
    },
  });
  console.log("Top Contributors:", contributors);

  return (
    <div ref={contribRef} className="bg-[#D0E7F9]/30 dark:bg-[#0F172A] border-t border-[#38BDF8]/20">
        <section className="cabin max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#0F172A] dark:text-[#D0E7F9]">
        Top Contributors
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 rounded-full bg-[#D0E7F9] dark:bg-[#223A5E] animate-pulse"
              />
            ))
          : contributors.map((user, idx) => (
              <motion.div
                key={user._id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <img
                    src={user.photo || "https://i.ibb.co/4f1z5xH/default-avatar.png"}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full border-4 border-[#38BDF8] shadow-lg bg-white dark:bg-[#223A5E]"
                  />
                  {idx === 0 && (
                    <FaCrown className="absolute -top-3 -right-3 text-yellow-400 text-2xl drop-shadow" />
                  )}
                </div>
                <div className="mt-2 text-[#0F172A] dark:text-[#38BDF8] font-semibold text-base text-center">
                  {user.name || "Anonymous"}
                </div>
                <div className="text-xs text-[#38BDF8] font-bold">
                  {user.count} article{user.count !== 1 ? "s" : ""}
                </div>
              </motion.div>
            ))}
      </div>
    </section>
    </div>
  );
}