import { FaCheck, FaTimes, FaTrash, FaStar } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

export default function AllArticles() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [declineId, setDeclineId] = useState(null);

  // Fetch all articles
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["all-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/articles");
      return res.data;
    },
  });

  // Approve article
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/articles/approve/${id}`);
    },
    onSuccess: () => {
      toast.success("Article approved!");
      queryClient.invalidateQueries(["all-articles"]);
    },
  });

  // Decline article
  const declineMutation = useMutation({
    mutationFn: async ({ id, reason }) => {
      await axiosSecure.patch(`/articles/decline/${id}`, { reason });
    },
    onSuccess: () => {
      toast.info("Article declined.");
      queryClient.invalidateQueries(["all-articles"]);
      setDeclineId(null);
    },
  });

  // Delete article
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/articles/${id}`);
    },
    onSuccess: () => {
      toast.error("Article deleted.");
      queryClient.invalidateQueries(["all-articles"]);
    },
  });

  // Make premium
  const premiumMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.patch(`/articles/premium/${id}`);
    },
    onSuccess: () => {
      toast.success("Article marked as premium!");
      queryClient.invalidateQueries(["all-articles"]);
    },
  });

  // Decline modal
  const handleDecline = (id) => {
    Swal.fire({
      title: "Decline Article",
      input: "textarea",
      inputLabel: "Reason for decline",
      inputPlaceholder: "Write the reason here...",
      inputAttributes: { "aria-label": "Reason" },
      showCancelButton: true,
      confirmButtonColor: "#38BDF8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Decline",
      background: "#D0E7F9",
      color: "#0F172A",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        declineMutation.mutate({ id, reason: result.value });
      }
    });
  };

  // Loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl shadow-lg p-4 border border-gray-200 bg-white dark:bg-[#223A5E]">
            <Skeleton height={120} className="mb-2 rounded-lg" />
            <Skeleton height={24} width="60%" className="mb-1" />
            <Skeleton height={16} width="40%" className="mb-1" />
            <Skeleton height={32} width="40%" />
          </div>
        ))}
      </div>
    );
  }

  // Mobile: Cards
  return (
    <div className="cabin">
      <h2 className="text-2xl font-bold mb-4">All Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
        {articles.map((a, i) => (
          <div key={i} className="rounded-xl shadow-lg p-4 border border-gray-200 bg-white dark:bg-[#223A5E] flex flex-col gap-2">
            <img src={a.image} alt={a.title} className="w-full h-32 object-cover rounded" />
            <div className="font-bold text-[#0F172A] dark:text-[#38BDF8]">{a.title}</div>
            <div className="text-xs text-[#38BDF8]">{a.publisher}</div>
            <div className="flex items-center gap-2">
              <span className="text-xs">{a.status}</span>
              {a.isPremium && <FaStar className="text-yellow-400" />}
            </div>
            <div className="flex gap-2 mt-2">
              {a.status !== "approved" && (
                <button
                  onClick={() => approveMutation.mutate(a._id)}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
                  data-tooltip-id="approve-tip"
                  data-tooltip-content="Approve"
                >
                  <FaCheck />
                </button>
              )}
              {a.status !== "declined" && (
                <button
                  onClick={() => handleDecline(a._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                  data-tooltip-id="decline-tip"
                  data-tooltip-content="Decline"
                >
                  <FaTimes />
                </button>
              )}
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
                className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400 transition"
                data-tooltip-id="delete-tip"
                data-tooltip-content="Delete"
              >
                <FaTrash />
              </button>
              {!a.isPremium && (
                <button
                  onClick={() => premiumMutation.mutate(a._id)}
                  className="bg-[#38BDF8] text-white p-2 rounded hover:bg-[#0EA5E9] transition"
                  data-tooltip-id="premium-tip"
                  data-tooltip-content="Make Premium"
                >
                  <FaStar />
                </button>
              )}
            </div>
            {/* Tooltips for mobile */}
            <Tooltip id="approve-tip" place="top" />
            <Tooltip id="decline-tip" place="top" />
            <Tooltip id="delete-tip" place="top" />
            <Tooltip id="premium-tip" place="top" />
          </div>
        ))}
      </div>
      {/* Desktop: Table */}
      <div className="overflow-x-auto hidden lg:block cabin">
        <table className="min-w-full bg-white dark:bg-[#223A5E] rounded-xl shadow">
          <thead className="text-left">
            <tr className="bg-[#38BDF8]/20">
              <th className="p-3">#</th>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              {/* <th className="p-3">Email</th> */}
              <th className="p-3">Photo</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              {/* <th className="p-3">Publisher</th> */}
              <th className="p-3">Premium</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((a, i) => (
              <tr key={a._id} className="border-b text-left">
                <td className="p-3">{i + 1}</td>
                <td className="p-1 items-center">
                  <img src={a.image} alt={a.title} className="w-24 h-16 object-cover rounded" />
                </td>
                <td className="p-3">{a.title}</td>
                <td className="p-3">{a.authorName || "N/A"}</td>
                {/* <td className="p-3">{a.authorEmail || "N/A"}</td> */}
                <td className="p-3">
                  {a.authorPhoto ? (
                    <img src={a.authorPhoto} alt="Author" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <span>N/A</span>
                  )}
                </td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      a.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : a.status === "declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.status}
                  </span>
                  {a.status === "declined" && a.declineReason && (
                    <div className="text-xs text-red-500 mt-1">Reason: {a.declineReason}</div>
                  )}
                </td>
                {/* <td className="p-3">{a.publisher}</td> */}
                <td className="p-3">
                  {a.isPremium ? (
                    <span className="text-[#38BDF8] font-bold">Yes</span>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>
                <td className="p-3 flex flex-col">
                  {a.status !== "approved" && (
                    <button
                      onClick={() => approveMutation.mutate(a._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition flex items-center gap-1"
                    >
                      <FaCheck /> <span>Approve</span>
                    </button>
                  )}
                  {a.status !== "declined" && (
                    <button
                      onClick={() => handleDecline(a._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-1"
                    >
                      <FaTimes /> <span>Decline</span>
                    </button>
                  )}
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
                    className="bg-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-400 transition flex items-center gap-1"
                  >
                    <FaTrash /> <span>Delete</span>
                  </button>
                  {!a.isPremium && (
                    <button
                      onClick={() => premiumMutation.mutate(a._id)}
                      className="bg-[#38BDF8] text-white px-3 py-1 rounded hover:bg-[#0EA5E9] transition flex items-center gap-1"
                    >
                      <FaStar /> <span>Make Premium</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}