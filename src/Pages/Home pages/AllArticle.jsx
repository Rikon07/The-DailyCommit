import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Select from "react-select";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import useAuth from "../../Hooks/UseAuth";
import { FaStar, FaEye } from "react-icons/fa6";
import Pagination from "../../Components/Extra Components/Pagination";

const tags = [
  "AI", "Machine Learning", "Deep Learning", "Data Science", "Cybersecurity", "Cloud Computing",
  "Web Development", "Mobile Development", "Programming Languages", "Algorithms", "Networking",
  "Blockchain", "DevOps", "Open Source", "Quantum Computing", "Software Engineering", "Database",
  "Big Data", "UI/UX", "Startups", "Tech Industry", "Research", "Hardware", "Ethics", "Education",
];
const tagsOptions = tags.map((tag) => ({ value: tag, label: tag }));

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#D0E7F9" : "#fff",
    borderColor: "#38BDF8",
    boxShadow: state.isFocused ? "0 0 0 2px #38BDF8" : null,
    color: "#0F172A",
    minWidth: 180,
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    color: "#0F172A",
    zIndex: 50,
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#38BDF8",
    color: "#fff",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#fff",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#38BDF8" : "#fff",
    color: isFocused ? "#fff" : "#0F172A",
  }),
};

export default function AllArticles() {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 9;

  const { user } = useAuth();

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Fetch publishers for filter dropdown
  useEffect(() => {
    axiosSecure
      .get("/publishers")
      .then((res) => setPublishers(res.data.map((p) => p.name)));
  }, [axiosSecure]);

  // Fetch articles with filters and pagination
  const { data, isLoading } = useQuery({
    queryKey: ["public-articles", search, selectedPublisher, selectedTags, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedPublisher) params.append("publisher", selectedPublisher);
      if (selectedTags.length)
        params.append("tags", selectedTags.map((t) => t.value).join(","));
      params.append("page", page);
      params.append("limit", limit);
      const res = await axiosSecure.get(`/articles?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const articles = data?.articles || [];
  const total = data?.total || 0;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto py-16 md:py-20 px-3 md:px-6 cabin">
      <h2 className="text-2xl font-bold mb-4 text-center">All Articles</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded border border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] bg-white dark:bg-[#223A5E] text-[#0F172A] dark:text-[#D0E7F9]"
        />
        <select
          value={selectedPublisher}
          onChange={(e) => setSelectedPublisher(e.target.value)}
          className="px-4 py-2 rounded border border-[#38BDF8] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] bg-white dark:bg-[#223A5E] text-[#0F172A] dark:text-[#D0E7F9]"
        >
          <option value="">All Publishers</option>
          {publishers.map((pub) => (
            <option key={pub} value={pub}>
              {pub}
            </option>
          ))}
        </select>
        <div className="min-w-[180px]">
          <Select
            isMulti
            options={tagsOptions}
            value={selectedTags}
            onChange={setSelectedTags}
            placeholder="Tags"
            styles={customSelectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary25: "#38BDF8",
                primary: "#38BDF8",
              },
            })}
          />
        </div>
      </div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: limit }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl shadow-lg p-4 border border-gray-200 bg-white dark:bg-[#223A5E]"
            >
              <Skeleton height={160} className="mb-2 rounded-lg" />
              <Skeleton height={24} width="60%" className="mb-1" />
              <Skeleton height={16} width="40%" className="mb-1" />
              <Skeleton count={2} height={12} className="mb-1" />
              <Skeleton height={32} width="40%" />
            </div>
          ))
        ) : articles.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No articles found.
          </div>
        ) : (
          articles.map((article) => {
            const isUserPremium =
              userInfo?.premiumTaken &&
              new Date(userInfo.premiumTaken) > new Date();
            const isPremiumArticle = article.isPremium;
            const canView = !isPremiumArticle || isUserPremium;
            return (
              <motion.div
                key={article._id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, delay: 0.05 }}
                className={`rounded-xl shadow-lg p-4 flex flex-col gap-2 transition-all duration-200 ${
                  isPremiumArticle
                    ? "border-2 border-[#38BDF8] bg-gradient-to-br from-[#38BDF8]/50 to-white dark:from-[#223A5E]/40 dark:to-gray-600"
                    : "border border-gray-200 bg-white dark:bg-[#223A5E]"
                }`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                  <div className="text-sm text-[#38BDF8] mb-1 flex items-center gap-2">
                    <FaEye className="text-[#38BDF8]" /> {article.views || 0}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="bg-[#38BDF8]/20 text-[#24789c] dark:text-[#38BDF8] text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-[#38BDF8] mb-2">{article.publisher}</div>
                  {isPremiumArticle && (
                    <span className="inline-block bg-[#38BDF8] text-white text-xs px-2 py-1 rounded-full mb-2">
                      Premium
                    </span>
                  )}
                </div>
                <div className="relative group w-full">
                  <Link
                    to={canView ? `/articles/${article._id}` : "#"}
                    className={`mt-auto px-4 py-1 rounded-lg font-semibold transition text-center block ${
                      canView
                        ? "bg-[#38BDF8] text-white hover:bg-[#0EA5E9]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
                    }`}
                    tabIndex={canView ? 0 : -1}
                    aria-disabled={!canView}
                  >
                    Details
                  </Link>
                  {!canView && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:block z-20">
                      <div className="bg-white/50 dark:bg-[#223A5E]/50 text-gray-700 border border-gray-200 shadow-lg rounded-lg p-3 w-52 text-center">
                        <p className="text-xs dark:text-white mb-2">
                          Be premium to view this article
                        </p>
                        <Link
                          to="/subscription"
                          className="px-3 py-1 text-sm rounded-md bg-[#38BDF8] text-white hover:bg-[#0EA5E9] transition"
                        >
                          Get Premium
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })
        )}
      </div>
      <Pagination page={page} total={total} limit={limit} setPage={setPage} />
    </div>
  );
}