import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";

export default function PremiumArticles() {
  const axiosSecure = useAxiosSecure();

 const { data, isLoading } = useQuery({
  queryKey: ["premium-articles"],
  queryFn: async () => {
    const res = await axiosSecure.get("/articles?isPremium=true");
    return res.data;
  },
});
const articles = (data?.articles || []).filter(a => a.status === "approved");


  return (
    <div className="max-w-6xl mx-auto px-6 py-20 cabin">
      <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center gap-2">
        Premium Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl shadow-lg p-4 flex flex-col gap-2 border-2 border-[#38BDF8] bg-gradient-to-br from-[#38BDF8]/10 to-white"
            >
              <Skeleton height={160} className="mb-2 rounded-lg" />
              <Skeleton height={24} width="60%" className="mb-1" />
              <Skeleton height={16} width="40%" className="mb-1" />
              <Skeleton height={32} width="40%" />
            </div>
          ))
        ) : articles.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No premium articles found.</div>
        ) : (
          articles.map((article, idx) => (
            <motion.div
              key={article._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="rounded-xl shadow-lg p-4 flex flex-col gap-2 border-2 border-[#38BDF8] bg-gradient-to-br from-[#38BDF8]/10 to-white dark:from-[#223A5E]/40 dark:to-[#0F172A]"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 text-[#0F172A] dark:text-[#38BDF8]">{article.title}</h3>
                <div className="text-sm text-[#38BDF8] mb-2">{article.publisher}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {article.tags?.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className="bg-[#38BDF8]/20 text-[#24789c] dark:text-[#38BDF8] text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/articles/${article._id}`}
                className="mt-auto px-4 py-1 rounded-lg font-semibold bg-[#38BDF8] text-white hover:bg-[#0EA5E9] transition flex items-center gap-2 justify-center"
              >
                <FaArrowRight /> Details
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}