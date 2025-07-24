import { Chart } from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaNewspaper, FaUsers } from "react-icons/fa6";

export default function DashboardHome() {
  const axiosSecure = useAxiosSecure();

  // Fetch articles and users for stats
  const { data: articles = [] } = useQuery({
    queryKey: ["dashboard-articles"],
    queryFn: async () => {
      const res = await axiosSecure.get("/articles");
      return res.data;
    },
  });
  const { data: user = [] } = useQuery({
    queryKey: ["dashboard-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // console.log(user.total);
  // const totalUser = users.users.length;

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

  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-[#223A5E]/80 rounded-xl shadow p-4 flex flex-col items-center">
          <FaNewspaper className="text-2xl text-[#38BDF8] mb-2" />
          <div className="text-2xl font-bold">{articles.length}</div>
          <div className="text-xs text-[#0F172A] dark:text-[#38BDF8]">Articles</div>
        </div>
        <div className="bg-white/80 dark:bg-[#223A5E]/80 rounded-xl shadow p-4 flex flex-col items-center">
          <FaUsers className="text-2xl text-[#38BDF8] mb-2" />
          <div className="text-2xl font-bold">{user.total}</div>
          <div className="text-xs text-[#0F172A] dark:text-[#38BDF8]">Users</div>
        </div>
        {/* Add more summary cards as needed */}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#D0E7F9]/60 dark:bg-[#223A5E]/60 rounded-xl p-6 shadow">
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
        </div>
        <div className="bg-[#D0E7F9]/60 dark:bg-[#223A5E]/60 rounded-xl p-6 shadow">
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
        </div>
        <div className="bg-[#D0E7F9]/60 dark:bg-[#223A5E]/60 rounded-xl p-6 shadow col-span-1 md:col-span-2">
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
        </div>
      </div>
    </div>
  );
}