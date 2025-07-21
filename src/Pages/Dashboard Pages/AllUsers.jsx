import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

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

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
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
              <td className="p-3">
                <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full" />
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
  );
}