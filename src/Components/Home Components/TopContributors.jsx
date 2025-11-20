import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa6";
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

  const getPodiumPosition = (idx) => {
    if (idx === 0) return { rank: 1, icon: FaCrown, color: "from-yellow-400 to-yellow-600", badge: "bg-gradient-to-r from-yellow-400 to-amber-500", scale: "md:scale-110" };
    if (idx === 1) return { rank: 2, icon: FaMedal, color: "from-gray-300 to-gray-400", badge: "bg-gradient-to-r from-gray-300 to-gray-400", scale: "md:scale-105" };
    if (idx === 2) return { rank: 3, icon: FaTrophy, color: "from-amber-600 to-amber-700", badge: "bg-gradient-to-r from-amber-600 to-amber-700", scale: "md:scale-100" };
    return null;
  };

  return (
    <div ref={contribRef} className="relative bg-gradient-to-b from-[#D0E7F9]/20 via-white to-[#D0E7F9]/30 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] border-t border-[#38BDF8]/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#38BDF8]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-aqua-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <section className="cabin relative max-w-7xl mx-auto py-16 px-4 md:py-20">
        {/* Modern header with gradient text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F172A] dark:text-[#D0E7F9]">
            Top Contributors
          </h2>
          <p className="text-[#475569] dark:text-[#94A3B8] text-sm lg:text-base max-w-2xl mx-auto">
            Celebrating our community's most dedicated writers and storytellers
          </p>
        </motion.div>

        {/* Contributors grid with podium effect */}
        <div className="flex flex-wrap justify-center items-end gap-6 md:gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#D0E7F9] to-[#38BDF8]/30 dark:from-[#223A5E] dark:to-[#38BDF8]/20 animate-pulse" />
                    <div className="mt-3 w-20 h-4 bg-[#D0E7F9] dark:bg-[#223A5E] rounded animate-pulse" />
                    <div className="mt-2 w-16 h-3 bg-[#D0E7F9] dark:bg-[#223A5E] rounded animate-pulse mx-auto" />
                  </div>
                </motion.div>
              ))
            : contributors.map((user, idx) => {
                const podium = getPodiumPosition(idx);
                const IconComponent = podium?.icon;
                
                return (
                  <motion.div
                    key={user._id || idx}
                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: idx * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`flex flex-col items-center group ${podium?.scale || ""}`}
                  >
                    {/* Card container with glassmorphism */}
                    <div className="relative p-4 rounded-2xl backdrop-blur-sm bg-white/60 dark:bg-[#1E293B]/60 border border-[#38BDF8]/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#38BDF8]/40">
                      {/* Rank badge for top 3 */}
                      {podium && (
                        <div className={`absolute -top-3 -left-3 ${podium.badge} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-lg z-10`}>
                          #{podium.rank}
                        </div>
                      )}

                      {/* Avatar with ring animation */}
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${podium?.color || "from-[#38BDF8] to-[#0EA5E9]"} blur-md opacity-50 group-hover:opacity-75 transition-opacity`}></div>
                        <img
                          src={user.photo || "https://i.ibb.co/4f1z5xH/default-avatar.png"}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                          className={`relative w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-4 ${
                            podium 
                              ? "border-transparent bg-gradient-to-r " + podium.color 
                              : "border-[#38BDF8]"
                          } shadow-xl bg-white dark:bg-[#223A5E] transform transition-transform duration-300`}
                        />
                        
                        {/* Crown/Medal/Trophy icon for top 3 */}
                        {podium && IconComponent && (
                          <div className={`absolute -top-4 -right-2 bg-gradient-to-r ${podium.color} p-2 rounded-full shadow-lg animate-bounce`}>
                            <IconComponent className="text-white text-lg drop-shadow-md" />
                          </div>
                        )}
                      </div>

                      {/* User info */}
                      <div className="mt-4 text-center space-y-1">
                        <div className="text-[#0F172A] dark:text-white font-bold text-sm md:text-base px-2 line-clamp-1">
                          {user.name || "Anonymous"}
                        </div>
                        <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white text-xs font-semibold rounded-full shadow-md">
                          <FaTrophy className="text-yellow-300" />
                          <span>{user.count} article{user.count !== 1 ? "s" : ""}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>
      </section>
    </div>
  );
}