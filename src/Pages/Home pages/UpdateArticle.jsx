import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Loader from "../../Components/Extra Components/Loader";
import Swal from "sweetalert2";
import "react-loading-skeleton/dist/skeleton.css";
import useAuth from "../../Hooks/UseAuth";

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

const UpdateArticle = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [publishers, setPublishers] = useState([]);
  const [article, setArticle] = useState(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm();

  // Fetch publishers
  useEffect(() => {
    axiosSecure.get("/publishers")
      .then(res => {
        setPublishers(res.data.map(pub => ({
          value: pub.name,
          label: pub.name
        })));
      })
      .catch(() => setPublishers([]));
  }, [axiosSecure]);

  // Fetch article data
  useEffect(() => {
    axiosSecure.get(`/articles/${id}`)
      .then(res => {
        setArticle(res.data);
        reset({
          title: res.data.title,
          publisher: { value: res.data.publisher, label: res.data.publisher },
          tags: res.data.tags.map(tag => ({ value: tag, label: tag })),
          description: res.data.description,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id, axiosSecure, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const updatedArticle = {
        title: data.title,
        publisher: data.publisher.value,
        tags: data.tags.map(tag => tag.value),
        description: data.description,
        // Optionally, you can allow updating image as well
      };
      await axiosSecure.patch(`/articles/${id}`, updatedArticle);
      await Swal.fire({
        title: "Updated!",
        text: "Article updated successfully!",
        icon: "success",
        confirmButtonColor: "#38BDF8",
        background: "#D0E7F9",
        color: "#0F172A",
      });
      navigate("/my-articles");
    } catch (err) {
      toast.error("Failed to update article.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!article) return <div className="text-center text-red-500">Article not found.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 pt-22 pb-10">
      <h2 className="text-2xl xl:text-3xl font-semibold mb-2 text-center cabin">Update Article</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-[#D0E7F9]/30 dark:bg-[#0F172A]/50 p-6 rounded-2xl shadow-xl backdrop-blur-md"
      >
        {/* Title */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Article Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          placeholder="Article Title"
          className="input-style input"
        />
        {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}

        {/* Publisher */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Publisher</label>
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
        {errors.publisher && <span className="text-red-500 text-xs">{errors.publisher.message}</span>}

        {/* Tags */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Tags</label>
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
        {errors.tags && <span className="text-red-500 text-xs">{errors.tags.message}</span>}

        {/* Description */}
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-300">Article Description</label>
        <textarea
          {...register("description", { required: "Description is required", maxLength: 1000 })}
          rows={6}
          placeholder="Write the article description..."
          className="input-style input"
        ></textarea>
        {errors.description && <span className="text-red-500 text-xs">{errors.description.message}</span>}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#38BDF8] text-white px-6 py-2 rounded-lg shadow-md hover:bg-sky-500 transition-all"
        >
          {loading ? "Updating..." : "Update Article"}
        </button>
      </form>
    </div>
  );
};

export default UpdateArticle;