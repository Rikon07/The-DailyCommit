import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaNewspaper, FaUsers, FaStar } from "react-icons/fa6";
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function DashboardHome() {
  const axiosSecure = useAxiosSecure();

  // Fetch articles and users for stats
  const { data: articleData, isLoading: articlesLoading } = useQuery({
    queryKey: ["dashboard-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });
  const { data: userData, isLoading: usersLoading } = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const articles = articleData?.articles || [];
  const totalArticles = articleData?.total || 0;
  const premiumArticles = articles.filter(a => a.isPremium).length;
  const users = userData?.users || [];
  const totalUsers = userData?.total || 0;
  const premiumUsers = users.filter(u => u.type === "premium").length;

  // Pie chart data: publisher distribution
  const publisherCounts = {};
  articles.forEach((a) => {
    publisherCounts[a.publisher] = (publisherCounts[a.publisher] || 0) + 1;
  });
  const pieData = [
    ["Publisher", "Articles"],
    ...Object.entries(publisherCounts),
  ];

  // Example static data for bar/line charts
  const barData = [
    ["Month", "Articles"],
    ["Jan", 10],
    ["Feb", 14],
    ["Mar", 8],
    ["Apr", 17],
  ];

  const lineData = [
    ["Day", "Views"],
    ["Mon", 100],
    ["Tue", 120],
    ["Wed", 90],
    ["Thu", 150],
    ["Fri", 80],
  ];

  const summaryCards = [
    {
      label: "All Articles",
      value: totalArticles,
      icon: <FaNewspaper className="text-2xl text-[#38BDF8]" />,
      color: "from-[#38BDF8]/20 to-white dark:from-[#223A5E]/60 dark:to-[#0F172A]",
    },
    {
      label: "Premium Articles",
      value: premiumArticles,
      icon: <FaStar className="text-2xl text-yellow-400" />,
      color: "from-yellow-200/30 to-white/10 dark:from-yellow-900/20 dark:to-[#0F172A]/20",
    },
    {
      label: "All Users",
      value: totalUsers,
      icon: <FaUsers className="text-2xl text-[#38BDF8]" />,
      color: "from-[#38BDF8]/20 to-white dark:from-[#223A5E]/60 dark:to-[#0F172A]",
    },
    {
      label: "Premium Users",
      value: premiumUsers,
      icon: <FaStar className="text-2xl text-yellow-400" />,
      color: "from-yellow-200/30 to-white/10 dark:from-yellow-900/20 dark:to-[#0F172A]/20",
    },
  ];

  return (
    <div className="space-y-4 cabin max-w-7xl mx-auto py-8 px-4">
      {/* Welcome */}
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#0F172A] dark:text-[#38BDF8]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome, Admin! <span className="text-[#38BDF8]">Dashboard Overview</span>
      </motion.h2>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {summaryCards.map((card, idx) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`rounded-2xl shadow-xl p-4 flex flex-col items-center bg-gradient-to-br ${card.color} border border-[#38BDF8]/20`}
          >
            <div className="mb-2">{card.icon}</div>
            <div className="text-2xl font-bold text-[#38BDF8] dark:text-yellow-400">
              {(articlesLoading || usersLoading) ? (
                <span className="animate-pulse">...</span>
              ) : (
                <CountUp end={card.value} duration={2} separator="," />
              )}
            </div>
            <div className="text-xs text-[#0F172A] dark:text-[#38BDF8]">{card.label}</div>
          </motion.div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-[#D0E7F9]/60 dark:bg-[#223A5E]/60 rounded-xl p-6 shadow"
        >
          <h3 className="font-bold text-lg mb-2 text-[#0F172A] dark:text-[#38BDF8]">Articles by Publisher</h3>
          <Chart
            chartType="PieChart"
            width="100%"
            height="300px"
            data={pieData}
            options={{
              backgroundColor: "transparent",
              legend: { textStyle: { color: "#0F172A" } },
              pieHole: 0.4,
              colors: ["#38BDF8", "#0EA5E9", "#223A5E", "#94A3B8"],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-[#D0E7F9]/60 dark:bg-[#223A5E]/60 rounded-xl p-6 shadow"
        >
          <h3 className="font-bold text-lg mb-2 text-[#0F172A] dark:text-[#38BDF8]">Articles per Month</h3>
          <Chart
            chartType="Bar"
            width="100%"
            height="300px"
            data={barData}
            options={{
              backgroundColor: "transparent",
              legend: { position: "none" },
              colors: ["#38BDF8"],
            }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="bg-[#D0E7F9]/60 dark:bg-[#223A5E]/60 rounded-xl p-6 shadow col-span-1 md:col-span-2"
        >
          <h3 className="font-bold text-lg mb-2 text-[#0F172A] dark:text-[#38BDF8]">Site Views (Demo)</h3>
          <Chart
            chartType="Line"
            width="100%"
            height="300px"
            data={lineData}
            options={{
              backgroundColor: "transparent",
              legend: { position: "none" },
              colors: ["#0EA5E9"],
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}