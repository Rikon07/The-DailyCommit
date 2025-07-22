import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function MyArticles() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch user's articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["my-articles", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-articles/${user.email}`);
      return res.data;
    },
  });

  // Delete article
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/articles/${id}`);
    },
    onSuccess: () => {
      toast.error("Article deleted.");
      queryClient.invalidateQueries(["my-articles", user.email]);
    },
  });

  // Update article (navigate to update page)
  const handleUpdate = (id) => {
    navigate(`/update-article/${id}`);
  };

  // Show decline reason modal
  const showDeclineReason = (reason) => {
    Swal.fire({
      title: "Decline Reason",
      text: reason,
      icon: "info",
      confirmButtonColor: "#38BDF8",
      background: "#D0E7F9",
      color: "#0F172A",
    });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-20 cabin px-2 md:px-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Articles</h2>
      <table className="min-w-full bg-white dark:bg-[#223A5E] rounded-xl shadow">
        <thead>
          <tr className="bg-[#38BDF8]/20">
            <th className="p-3">#</th>
            <th className="p-3">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">isPremium</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a, i) => (
            <tr key={a._id} className="border-b">
              <td className="p-3">{i + 1}</td>
              <td className="p-3">{a.title}</td>
              <td className="p-3">
                {a.status === "approved" && (
                  <span className="text-green-600 font-bold">Approved</span>
                )}
                {a.status === "pending" && (
                  <span className="text-yellow-600 font-bold">Pending</span>
                )}
                {a.status === "declined" && (
                  <span className="text-red-600 font-bold flex items-center gap-2">
                    Declined
                    {a.declineReason && (
                      <button
                        onClick={() => showDeclineReason(a.declineReason)}
                        className="ml-2 px-2 py-1 bg-[#38BDF8] text-white rounded text-xs"
                      >
                        Reason
                      </button>
                    )}
                  </span>
                )}
              </td>
              <td className="p-3">
                {a.isPremium ? (
                  <span className="text-[#38BDF8] font-bold">Yes</span>
                ) : (
                  <span className="text-gray-400">No</span>
                )}
              </td>
              <td className="p-3 flex flex-col gap-2">
                <Link
                  to={`/articles/${a._id}`}
                  className="bg-[#38BDF8] text-white px-3 py-1 rounded hover:bg-[#0EA5E9] transition text-center"
                >
                  Details
                </Link>
                <button
                  onClick={() => handleUpdate(a._id)}
                  className="bg-yellow-400 text-[#0F172A] px-3 py-1 rounded hover:bg-yellow-500 transition"
                >
                  Update
                </button>
                <button
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      text: "This will delete the article permanently.",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#38BDF8",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Delete",
                      background: "#D0E7F9",
                      color: "#0F172A",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteMutation.mutate(a._id);
                      }
                    })
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}