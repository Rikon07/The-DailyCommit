import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FileImage } from "lucide-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Loader from "../../Components/Extra Components/Loader";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../Hooks/UseAuth";
const tagsOptions = [
  { value: "AI", label: "AI" },
  { value: "Machine Learning", label: "Machine Learning" },
  { value: "Deep Learning", label: "Deep Learning" },
  { value: "Data Science", label: "Data Science" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Web Development", label: "Web Development" },
  { value: "Mobile Development", label: "Mobile Development" },
  { value: "Programming Languages", label: "Programming Languages" },
  { value: "Algorithms", label: "Algorithms" },
  { value: "Networking", label: "Networking" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "DevOps", label: "DevOps" },
  { value: "Open Source", label: "Open Source" },
  { value: "Quantum Computing", label: "Quantum Computing" },
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Database", label: "Database" },
  { value: "Big Data", label: "Big Data" },
  { value: "UI/UX", label: "UI/UX" },
  { value: "Startups", label: "Startups" },
  { value: "Tech Industry", label: "Tech Industry" },
  { value: "Research", label: "Research" },
  { value: "Hardware", label: "Hardware" },
  { value: "Ethics", label: "Ethics" },
  { value: "Education", label: "Education" },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "dark:#0F172A",
    borderColor: state.isFocused ? "#38BDF8" : "#94A3B8",
    boxShadow: state.isFocused ? "0 0 0 2px #38BDF8" : null,
    color: "#1E293B",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#94A3B8",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#D0E7F9 dark:#0F172A",
    color: "#D0E7F9 ",
  }),
  option: (base, { isFocused }) => ({
    ...base,
    backgroundColor: isFocused ? "#1E293B" : "#0F172A",
    color: "#D0E7F9 ",
  }),
};

const AddArticle = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const axiosSecure = useAxiosSecure();
  // const navigate = useNavigate();
  const { user } = useAuth();

  //   const [publishers, setPublishers] = useState([
  //   { value: "SkillHunt", label: "SkillHunt" },
  //   { value: "CodePress", label: "CodePress" },
  // ]);
  // Fetch publishers from backend
  useEffect(() => {
    axiosSecure
      .get("/publishers")
      .then((res) => {
        setPublishers(
          res.data.map((pub) => ({
            value: pub.name,
            label: pub.name,
          }))
        );
      })
      .catch(() => setPublishers([]));
  }, [axiosSecure]);

  const handleImageChange = (file) => {
    if (!file || file.length === 0) return;
    const selectedFile = file[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const uploadImageToImgbb = async (file) => {
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=dbe36fc890c8c903039528c40c376b69`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      return data.data.display_url;
    } catch (err) {
      toast.error("Image upload failed 😓");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const imageFile = data.image[0];

    const imageUrl = await uploadImageToImgbb(imageFile);
    if (!imageUrl) {
      setLoading(false);
      return;
    }
    const dateOnly = new Date().toISOString().split("T")[0];

    const article = {
      title: data.title,
      image: imageUrl,
      publisher: data.publisher.value,
      tags: data.tags.map((tag) => tag.value),
      description: data.description,
      status: "pending",
      date: dateOnly,
      authorName: user.displayName,
      authorEmail: user.email,
      authorPhoto:
        user.photoURL || "https://i.ibb.co/4f1z5xH/default-avatar.png",
    };

    try {
  const res = await axiosSecure.post("/articles", article);
  if (res.data.insertedId) {
    await Swal.fire({
      title: "Submitted!",
      text: "📰 Article submitted for approval!",
      icon: "success",
      confirmButtonColor: "#38BDF8",
      background: "#D0E7F9",
      color: "#0F172A",
    });
    reset();
    setPreviewUrl(null);
  }
} catch (err) {
  // If backend sends a 403, show a friendly error
  if (err.response && err.response.status === 403) {
    await Swal.fire({
      title: "Post Limit Reached",
      text: err.response.data.message || "Normal users can only post 1 article.",
      icon: "warning",
      confirmButtonColor: "#38BDF8",
      background: "#D0E7F9",
      color: "#0F172A",
    });
  } else {
    toast.error("Something went wrong 😬");
  }
} finally {
  setLoading(false);
}
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 pt-22 pb-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl xl:text-3xl font-semibold mb-2 text-center cabin">
        Add New Article
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-[#D0E7F9]/30 dark:bg-[#0F172A]/50 p-6 rounded-2xl shadow-xl backdrop-blur-md"
      >
        {/* Title */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
          Article Title
        </label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Article Title"
          className="input-style input"
        />
        {errors.title && (
          <span className="text-red-500 text-xs">{errors.title.message}</span>
        )}

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
            Upload Image
          </label>
          <div className="relative w-full">
            <input
              {...register("image", {
                required: "Image is required",
                onChange: (e) => handleImageChange(e.target.files),
              })}
              type="file"
              accept="image/*"
              className="input-style input file:bg-sky-100 dark:file:bg-sky-200 file:text-sky-600 file:dark:text-sky-300 file:border-none cursor-pointer file:rounded-sm file:py-1 file:px-4 file:text-xs"
            />
            <FileImage className="absolute right-4 top-2.5 text-[#38BDF8]" />
          </div>
          {errors.image && (
            <span className="text-red-500 text-xs">{errors.image.message}</span>
          )}
          {uploadingImage ? (
            <Skeleton height={100} className="mt-3 rounded-lg" />
          ) : (
            previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-3 rounded-md w-40 h-28 object-cover border border-sky-300"
              />
            )
          )}
        </div>

        {/* Publisher */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
          Publisher
        </label>
        <Controller
          name="publisher"
          control={control}
          rules={{ required: "Publisher is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={publishers}
              placeholder="Select Publisher"
              styles={customStyles}
              isLoading={publishers.length === 0}
            />
          )}
        />
        {errors.publisher && (
          <span className="text-red-500 text-xs">
            {errors.publisher.message}
          </span>
        )}

        {/* Tags */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
          Tags
        </label>
        <Controller
          name="tags"
          control={control}
          rules={{ required: "Select at least one tag" }}
          render={({ field }) => (
            <Select
              {...field}
              options={tagsOptions}
              isMulti
              placeholder="Select Tags"
              styles={customStyles}
            />
          )}
        />
        {errors.tags && (
          <span className="text-red-500 text-xs">{errors.tags.message}</span>
        )}

        {/* Description */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">
          Article Description
        </label>
        <textarea
          {...register("description", {
            required: "Description is required",
            maxLength: 3000,
          })}
          rows={6}
          placeholder="Write the article description..."
          className="w-full px-4 py-3 rounded-lg border border-[#38BDF8]/20 bg-white dark:bg-[#0F172A] text-[#0F172A] dark:text-[#D0E7F9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-y  text-base"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading || uploadingImage}
          className="bg-[#38BDF8] text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-500 transition-all"
        >
          {loading ? "Submitting..." : "Submit Article"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddArticle;
