import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { FileImage } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { motion } from "framer-motion";
import Loader from "../../Components/Extra Components/Loader";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tagsOptions = [
  { value: "HTML", label: "HTML" },
  { value: "CSS", label: "CSS" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "React", label: "React" },
  { value: "MongoDB", label: "MongoDB" },
  { value: "Node.js", label: "Node.js" },
  { value: "Algorithms", label: "Algorithms" },
  { value: "AI", label: "AI" },
];

const publishers = [
  { value: "SkillHunt", label: "SkillHunt" },
  { value: "CodePress", label: "CodePress" },
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
  const { register, handleSubmit, control, reset, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=dbe36fc890c8c903039528c40c376b69`,
        formData
      );
      return res.data.data.display_url;
    } catch (err) {
      console.error("Image upload failed:", err);
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
    };
    console.log("Submitting article:", article);

    try {
      const res = await axiosSecure.post("/articles", article);
      if (res.data.insertedId) {
        toast.success("📰 Article submitted for approval!");
        reset();
        setPreviewUrl(null);
        // navigate("/dashboard/my-articles");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong 😬");
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
      <h2 className="text-2xl xl:text-3xl font-semibold mb-2 text-center cabin">Add New Article</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-[#D0E7F9]/30 dark:bg-[#0F172A]/50 p-6 rounded-2xl shadow-xl backdrop-blur-md"
      >
        {/* Title */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Article Title</label>
        <input
          {...register("title", { required: true })}
          placeholder="Article Title"
          className="input-style input"
        />

        {/* Image Upload */}
        <div>
          <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Upload Image</label>
          <div className="relative w-full">
            <input
              {...register("image", {
                required: true,
                onChange: (e) => handleImageChange(e.target.files),
              })}
              type="file"
              accept="image/*"
              className="input-style input file:bg-sky-100 dark:file:bg-sky-200 file:text-sky-600 file:dark:text-sky-300 file:border-none cursor-pointer file:rounded-sm file:py-1 file:px-4 file:text-xs"
            />
            <FileImage className="absolute right-4 top-2.5 text-[#38BDF8]" />
          </div>
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
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Publisher</label>
        <Controller
          name="publisher"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              options={publishers}
              placeholder="Select Publisher"
              styles={customStyles}
            />
          )}
        />

        {/* Tags */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Tags</label>
        <Controller
          name="tags"
          control={control}
          rules={{ required: true }}
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

        {/* Description */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Article Description</label>
        <textarea
          {...register("description", { required: true })}
          rows={6}
          placeholder="Write the article description..."
          className="input-style input"
        ></textarea>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#38BDF8] text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-500 transition-all"
        >
          Submit Article
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddArticle;
