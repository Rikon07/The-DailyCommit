import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa6";
import { Eye } from "lucide-react";
import { Tooltip } from "react-tooltip";
import { useRef, useEffect } from "react";
import gsap from "gsap";
export default function TrendingArticles({ userInfo }) {
  const axiosSecure = useAxiosSecure();
  const navPrevRef = useRef(null);
  const navNextRef = useRef(null);
  const trendingRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      trendingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  // const { data: articles = [], isLoading } = useQuery({
  //   queryKey: ["trending-articles"],
  //   queryFn: async () => {
  //     const res = await axiosSecure.get("/articles");
  //     return res.data;
  //   },
  // });

  // const trending = [...articles]
  //   .sort((a, b) => (b.views || 0) - (a.views || 0))
  //   .slice(0, 6);
  const { data, isLoading } = useQuery({
  queryKey: ["trending-articles"],
  queryFn: async () => {
    const res = await axiosSecure.get("/articles");
    return res.data;
  },
});
const articles = data?.articles || [];
const trending = [...articles]
  .sort((a, b) => (b.views || 0) - (a.views || 0))
  .slice(0, 6);

  const isUserPremium =
    userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date();

  return (
    <div
      ref={trendingRef}
      id="trending"
      className="bg-gradient-to-b from-[#38BDF8]/10 to-[#D0E7F9]/30 dark:from-[#223A5E]/40 dark:to-[#0F172A] border-t border-[#38BDF8]/20 dark:border-[#1e293b]"
    >
      <section className="max-w-5xl cabin mx-auto py-12 md:py-16 px-3 md:px-6 relative">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F172A] dark:text-[#D0E7F9]">
            Trending Articles
          </h2>
          <p className="text-[#475569] dark:text-[#94A3B8] mt-2 text-sm lg:text-base">
            The mostly viewed Articles
          </p>
        </div>
        {/* Custom navigation buttons */}
        <div className="absolute right-7 top-22 md:top-28 z-20 flex gap-2">
          <button
            ref={navPrevRef}
            className="swiper-nav-btn bg-[#38BDF8] hover:bg-[#0EA5E9] text-white rounded-xl p-2 shadow transition"
            aria-label="Previous"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M13 17l-5-5 5-5" />
            </svg>
          </button>
          <button
            ref={navNextRef}
            className="swiper-nav-btn bg-[#38BDF8] hover:bg-[#0EA5E9] text-white rounded-xl p-2 shadow transition"
            aria-label="Next"
          >
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 7l5 5-5 5" />
            </svg>
          </button>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl shadow-lg p-4 border border-gray-200 bg-white dark:bg-[#223A5E]"
              >
                <Skeleton height={180} className="mb-2 rounded-lg" />
                <Skeleton height={24} width="60%" className="mb-1" />
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: navPrevRef.current,
              nextEl: navNextRef.current,
            }}
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = navPrevRef.current;
              swiper.params.navigation.nextEl = navNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              396: { slidesPerView: 1 },
              568: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="trending-swiper"
          >
            {trending.map((article, idx) => {
              const isPremiumArticle = article.isPremium;
              const canView = !isPremiumArticle || isUserPremium;
              return (
                <SwiperSlide key={article._id}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`relative group rounded-2xl shadow-xl p-0 flex flex-col h-full border-0 overflow-hidden transition-all duration-300 ${
                      isPremiumArticle
                        ? "bg-gradient-to-br from-[#38BDF8]/60 via-white/80 to-[#0F172A]/10 dark:from-[#223A5E]/80 dark:via-[#38BDF8]/20 dark:to-[#0F172A] ring-2 ring-[#38BDF8]"
                        : "bg-white dark:bg-[#223A5E]"
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {isPremiumArticle && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#38BDF8]/90 px-3 py-1 rounded-full shadow text-white font-bold text-xs">
                          <FaCrown className="text-yellow-300 mr-1" />
                          Premium
                        </div>
                      )}
                      {/* Glassy overlay with only the title */}
                      <div
                        className="absolute left-0 right-0 bottom-0 z-10 px-4 pt-4 pb-23 mx-1
                          bg-white/20 dark:bg-[#0F172A]/80 backdrop-blur-md rounded-b-2xl
                          translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center"
                      >
                        <h3 className="text-lg font-bold text-[#0F172A] dark:text-[#38BDF8] truncate">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                    {/* Bottom info always visible */}
                    <div className="flex-1 flex flex-col p-4">
                      <span className="text-sm mb-1 text-[#38BDF8] font-semibold">
                        {article.publisher}
                      </span>
                      <div className="flex items-center gap-2 mb-2">
                        {article.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="bg-[#38BDF8]/20 text-[#24789c] dark:text-[#38BDF8] text-xs px-2 py-1 rounded-full overflow-hidden whitespace-nowrap"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Eye className="w-4 h-4 text-[#38BDF8]" />
                        <span className="text-xs text-[#38BDF8]">
                          {article.views || 0}
                        </span>
                      </div>
                      <div className="mt-auto">
                        <Link
                          to={canView ? `/articles/${article._id}` : "#"}
                          className={`px-4 py-1 rounded-lg text-sm font-semibold transition text-center w-full block ${
                            canView
                              ? "bg-[#38BDF8] text-white hover:bg-[#0EA5E9]"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                          }`}
                          tabIndex={canView ? 0 : -1}
                          aria-disabled={!canView}
                          data-tooltip-id={
                            canView
                              ? undefined
                              : `premium-tooltip-${article._id}`
                          }
                          data-tooltip-content={
                            canView
                              ? undefined
                              : "Only premium users can view premium articles"
                          }
                        >
                          Details
                        </Link>
                        {!canView && (
                          <Tooltip
                            id={`premium-tooltip-${article._id}`}
                            place="top"
                            effect="solid"
                            className="!bg-[#38BDF8] !text-[#0F172A] !rounded-lg !px-4 !py-2 !font-semibold"
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>
    </div>
  );
}
