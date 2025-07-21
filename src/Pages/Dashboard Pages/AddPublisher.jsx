import { useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../Components/Extra Components/Loader";
import Swal from "sweetalert2";

const AddPublisher = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [uploading, setUploading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all publishers
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  // Upload image to imgbb
  const uploadImageToImgbb = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=dbe36fc890c8c903039528c40c376b69`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.data.display_url;
    } catch {
      toast.error("Image upload failed!");
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Handle form submit
  const onSubmit = async (data) => {
    if (!data.logo[0]) {
      toast.error("Logo is required!");
      return;
    }
    const logoUrl = await uploadImageToImgbb(data.logo[0]);
    if (!logoUrl) return;

    try {
      await axiosSecure.post("/publishers", { name: data.name, logo: logoUrl });
      await Swal.fire({
        title: "Publisher Added!",
        icon: "success",
        confirmButtonColor: "#38BDF8",
        background: "#D0E7F9",
        color: "#0F172A",
      });
      reset();
      queryClient.invalidateQueries(["publishers"]);
    } catch {
      toast.error("Failed to add publisher.");
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add Publisher</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#D0E7F9]/40 dark:bg-[#0F172A]/60 p-6 rounded-2xl shadow-xl space-y-5"
      >
        <div>
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Publisher Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Publisher Name"
            className="input-style input"
          />
          {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Publisher Logo</label>
          <input
            {...register("logo", { required: "Logo is required" })}
            type="file"
            accept="image/*"
            className="input-style input"
          />
          {errors.logo && <span className="text-red-500 text-xs">{errors.logo.message}</span>}
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={uploading}
          className="bg-[#38BDF8] text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-500 transition-all"
        >
          {uploading ? "Uploading..." : "Add Publisher"}
        </motion.button>
      </form>

      <div className="mt-10">
        <h3 className="text-lg font-semibold mb-3">All Publishers</h3>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {publishers.map((pub) => (
              <div key={pub._id} className="bg-white dark:bg-[#223A5E] rounded-xl p-4 flex flex-col items-center shadow">
                <img src={pub.logo} alt={pub.name} className="w-16 h-16 object-cover rounded-full mb-2" />
                <div className="font-semibold text-[#0F172A] dark:text-[#38BDF8]">{pub.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AddPublisher;