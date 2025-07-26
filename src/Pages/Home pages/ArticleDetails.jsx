import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { FaEye, FaTag, FaBuilding } from "react-icons/fa6";

export default function ArticleDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 cabin">
        <div className="max-w-2xl mx-auto py-8 px-6 bg-white dark:bg-[#223A5E] rounded-xl shadow">
          <Skeleton height={240} className="mb-4 rounded-lg" />
          <Skeleton height={32} width="60%" className="mb-2" />
          <Skeleton height={20} width="40%" className="mb-2" />
          <Skeleton height={16} width="30%" className="mb-2" />
          <Skeleton count={6} height={12} className="mb-1" />
        </div>
      </div>
    );
  }
  if (!article || article.message === "Article not found") return <div>Article not found.</div>;

  return (
    <div className="py-20 cabin">
      <motion.div
        className="max-w-2xl mx-auto py-8 px-6 bg-white dark:bg-[#223A5E] rounded-xl shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-60 object-cover rounded-lg mb-4 shadow"
        />
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          {article.title}
        </h2>
        <div className="flex items-center gap-2 mb-2 text-[#38BDF8]">
          <FaBuilding /> <span>{article.publisher}</span>
        </div>
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-500 dark:text-[#94A3B8]">
          <FaEye className="text-[#38BDF8]" /> Views: {article.views || 1}
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags?.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 bg-[#38BDF8]/20 text-[#24789c] dark:text-[#38BDF8] text-xs px-2 py-1 rounded-full"
            >
              <FaTag className="text-[#38BDF8]" /> {tag}
            </span>
          ))}
        </div>
        <motion.p
          className="text-gray-800 dark:text-gray-200 text-base leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {article.description}
        </motion.p>
      </motion.div>
    </div>
  );
}