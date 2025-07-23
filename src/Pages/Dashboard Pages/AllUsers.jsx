import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import { FaUserShield } from "react-icons/fa6";
export default function AllUsers() {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (email) => {
      await axiosSecure.patch(`/users/make-admin/${email}`);
    },
    onSuccess: () => {
      toast.success("User promoted to admin!");
      queryClient.invalidateQueries(["users"]);
    },
  });

  if (isLoading) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-xl shadow-lg p-4 border border-gray-200 bg-white dark:bg-[#223A5E]">
          <Skeleton circle height={48} width={48} className="mb-2" />
          <Skeleton height={24} width="60%" className="mb-1" />
          <Skeleton height={16} width="40%" className="mb-1" />
        </div>
      ))}
    </div>
  );
}

  return (
    <div className="bg-[#D0E7F9]/30 dark:bg-[#0F172A] p-2 lg:p-6 rounded-xl shadow">
      <div className="cabin">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
      {users.map((u, i) => (
        <div key={i} className="rounded-xl shadow-lg p-2 border border-gray-200 bg-white dark:bg-[#223A5E] flex flex-col items-center gap-2">
          <img src={u.photo} alt={u.name} className="w-12 h-12 rounded-full object-cover border border-[#38BDF8]" />
          <div className="font-bold text-[#0F172A] dark:text-[#38BDF8]">{u.name}</div>
          <div className="text-xs text-[#38BDF8]">{u.email}</div>
          <div className="flex items-center gap-2">
            {u.role === "admin" ? (
              <span className="text-green-600 font-bold flex items-center gap-1"><FaUserShield /> Admin</span>
            ) : (
              <button
                onClick={() => makeAdminMutation.mutate(u.email)}
                className="bg-[#38BDF8] text-white px-4 py-1 rounded hover:bg-[#0EA5E9] transition"
              >
                Make Admin
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
      <div className="overflow-x-auto hidden lg:block text-center cabin">
      <table className="min-w-full bg-white dark:bg-[#223A5E] rounded-xl shadow">
        <thead>
          <tr className="bg-[#38BDF8]/20">
            <th className="p-3">#</th>
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={u._id} className="border-b">
              <td className="p-3">{i + 1}</td>
              <td className="p-3 flex justify-center">
                <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full object-cover border border-[#38BDF8]" />
              </td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3">
                {u.role === "admin" ? (
                  <span className="text-green-600 font-bold">Admin</span>
                ) : (
                  <button
                    onClick={() => makeAdminMutation.mutate(u.email)}
                    className="bg-[#38BDF8] text-white px-4 py-1 rounded hover:bg-[#0EA5E9] transition"
                  >
                    Make Admin
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}