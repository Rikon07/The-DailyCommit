import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export default function PremiumArticles() {
  const axiosSecure = useAxiosSecure();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["premium-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles?isPremium=true");
      // Optionally filter for status: "approved" if not done in backend
      return res.data.filter(a => a.status === "approved");
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-6 py-20 cabin">
      <h2 className="text-2xl font-bold mb-4 text-center">Premium Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div>Loading...</div>
        ) : articles.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">No premium articles found.</div>
        ) : (
          articles.map(article => (
            <div
              key={article._id}
              className="rounded-xl shadow-lg p-4 flex flex-col gap-2 border-2 border-[#38BDF8] bg-gradient-to-br from-[#38BDF8]/10 to-white"
            >
              <img src={article.image} alt={article.title} className="w-full h-40 object-cover rounded-lg mb-2" />
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{article.title}</h3>
                <div className="text-sm text-[#38BDF8] mb-1">{article.publisher}</div>
                <p className="text-gray-700 dark:text-gray-200 text-sm mb-2 line-clamp-3">{article.description}</p>
                <span className="inline-block bg-[#38BDF8] text-white text-xs px-2 py-1 rounded-full mb-2">
                  Premium
                </span>
              </div>
              <Link
                to={`/articles/${article._id}`}
                className="mt-auto px-4 py-2 rounded-lg font-semibold bg-[#38BDF8] text-white hover:bg-[#0EA5E9] transition"
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