const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  if (totalPages <= 1) return null;
  return (
    <div className="flex gap-2 justify-center mt-8">
      <button
        className="px-3 py-1 rounded bg-[#38BDF8] text-white disabled:opacity-50"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded ${page === i + 1 ? "bg-[#0F172A] text-white" : "bg-gray-200 dark:bg-[#223A5E] text-[#0F172A] dark:text-[#D0E7F9]"}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
      <button
        className="px-3 py-1 rounded bg-[#38BDF8] text-white disabled:opacity-50"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;