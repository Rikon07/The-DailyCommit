import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export default function AllArticles({ userInfo }) {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [tags, setTags] = useState([
    "HTML", "CSS", "JavaScript", "React", "MongoDB", "Node.js", "Algorithms", "AI"
  ]);

  // Fetch publishers for filter dropdown (optional, or use static)
  useState(() => {
    axiosSecure.get("/publishers").then(res => setPublishers(res.data.map(p => p.name)));
  }, []);

  // Fetch articles with filters
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["public-articles", search, selectedPublisher, selectedTags],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedPublisher) params.append("publisher", selectedPublisher);
      if (selectedTags.length) params.append("tags", selectedTags.join(","));
      const res = await axiosSecure.get(`/articles?${params.toString()}`);
      return res.data;
    },
  });

  return (
    <div className="max-w-6xl mx-auto py-18 px-6 cabin">
      <h2 className="text-2xl font-bold mb-4 text-center">All Articles</h2>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-center">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-4 py-2 rounded border border-[#38BDF8] focus:outline-none"
        />
        <select
          value={selectedPublisher}
          onChange={e => setSelectedPublisher(e.target.value)}
          className="px-4 py-2 rounded border border-[#38BDF8]"
        >
          <option value="">All Publishers</option>
          {publishers.map(pub => (
            <option key={pub} value={pub}>{pub}</option>
          ))}
        </select>
        <select
          multiple
          value={selectedTags}
          onChange={e => setSelectedTags(Array.from(e.target.selectedOptions, o => o.value))}
          className="px-4 py-2 rounded border border-[#38BDF8] min-w-[120px]"
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : articles.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No articles found.</div>
        ) : (
          articles.map(article => (
            <div
              key={article._id}
              className={`rounded-xl shadow-lg p-4 flex flex-col gap-2 transition-all duration-200 ${
                article.isPremium
                  ? "border-2 border-[#38BDF8] bg-gradient-to-br from-[#38BDF8]/10 to-white"
                  : "border border-gray-200 bg-white"
              }`}
            >
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                <div className="text-sm text-[#38BDF8] mb-1">{article.publisher}</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-2 line-clamp-3">{article.description}</p>
                {article.isPremium && (
                  <span className="inline-block bg-[#38BDF8] text-white text-xs px-2 py-1 rounded-full mb-2">
                    Premium
                  </span>
                )}
              </div>
              <Link
                to={`/articles/${article._id}`}
                className={`mt-auto px-4 py-2 rounded-lg font-semibold transition ${
                  article.isPremium && !(userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date())
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-[#38BDF8] text-white hover:bg-[#0EA5E9]"
                }`}
                disabled={article.isPremium && !(userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date())}
                tabIndex={article.isPremium && !(userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date()) ? -1 : 0}
              >
                Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}