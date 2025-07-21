import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function ArticleDetails() {
  const { id } = useParams();
//   console.log("Article ID:", id);
// console.log("Article ID from useParams:", id);
  const axiosSecure = useAxiosSecure();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/articles/${id}`);
      console.log("Fetched article details:", res.data);
      return res.data;
    },
  });
    // console.log("Fetched article:", article);

if (isLoading) return <div>Loading...</div>;
if (!article || article.message === "Article not found") return <div>Article not found.</div>;

  return (
    <div className="py-20 cabin">
        <div className="max-w-2xl mx-auto py-8 px-6 bg-white dark:bg-[#223A5E] rounded-xl shadow">
      <img src={article.image} alt={article.title} className="w-full h-60 object-cover rounded-lg mb-4" />
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <div className="mb-2 text-[#38BDF8]">{article.publisher}</div>
      <div className="mb-2 text-sm text-gray-500">Views: {article.views || 1}</div>
      <p className="text-gray-800 dark:text-gray-200">{article.description}</p>
      {/* Add more fields as needed */}
    </div>
    </div>
  );
}