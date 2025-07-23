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
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

export default function TrendingArticles({ userInfo }) {
  const axiosSecure = useAxiosSecure();
  const navPrevRef = useRef(null);
  const navNextRef = useRef(null);

  // Fetch all approved articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["trending-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });

  // Sort by views and take top 6
  const trending = [...articles]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 6);

  // Is the user premium?
  const isUserPremium = userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date();

  return (
    <div className="bg-[#D0E7F9]/30 dark:bg-[#0F172A]">
        <section className="max-w-5xl cabin mx-auto py-12 md:py-16 px-3 md:px-6 relative ">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#0F172A] dark:text-[#38BDF8]">
        Trending Articles
      </h2>
      {/* Custom navigation buttons */}
      <div className="absolute right-7 top-15 md:top-22 z-20 flex gap-2">
        <button
          ref={navPrevRef}
          className="swiper-nav-btn bg-[#38BDF8] hover:bg-[#0EA5E9] text-white rounded-xl p-2 shadow transition"
          aria-label="Previous"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M13 17l-5-5 5-5" />
          </svg>
        </button>
        <button
          ref={navNextRef}
          className="swiper-nav-btn bg-[#38BDF8] hover:bg-[#0EA5E9] text-white rounded-xl p-2 shadow transition"
          aria-label="Next"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 7l5 5-5 5" />
          </svg>
        </button>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl shadow-lg p-4 border border-gray-200 bg-white dark:bg-[#223A5E]">
              <Skeleton height={180} className="mb-2 rounded-lg" />
              <Skeleton height={24} width="60%" className="mb-1" />
              <Skeleton height={16} width="40%" className="mb-1" />
              <Skeleton height={32} width="40%" />
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
          onInit={swiper => {
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
                  className={`rounded-2xl shadow-xl p-0 flex flex-col h-full border-0 overflow-hidden group transition-all duration-300 ${
                    isPremiumArticle
                      ? "bg-gradient-to-br from-[#38BDF8]/60 via-white/80 to-[#0F172A]/10 dark:from-[#223A5E]/80 dark:via-[#38BDF8]/20 dark:to-[#0F172A] ring-2 ring-[#38BDF8] relative"
                      : "bg-white dark:bg-[#223A5E]"
                  }`}
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isPremiumArticle && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#38BDF8]/90 px-3 py-1 rounded-full shadow text-white font-bold text-xs">
                        <FaCrown className="text-yellow-300 mr-1" />
                        Premium
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <h3 className="text-lg font-bold mb-1 text-[#0F172A] dark:text-[#38BDF8] truncate">
                      {article.title}
                    </h3>
                    <div className="text-sm text-[#38BDF8] mb-2 flex items-center gap-2">
                      <span>{article.publisher}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-auto">
                      <Eye className="w-4 h-4 text-[#38BDF8]" />
                      <span className="text-xs text-[#38BDF8]">{article.views || 0}</span>
                    </div>
                    {/* Details Button */}
                    <div className="mt-4">
                      <Link
                        to={canView ? `/articles/${article._id}` : "#"}
                        className={`px-4 py-1 rounded-lg text-sm font-semibold transition text-center w-full block ${
                          canView
                            ? "bg-[#38BDF8] text-white hover:bg-[#0EA5E9]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                        }`}
                        tabIndex={canView ? 0 : -1}
                        aria-disabled={!canView}
                        data-tooltip-id={canView ? undefined : `premium-tooltip-${article._id}`}
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