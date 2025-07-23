import { Link } from "react-router-dom";
import ThemeToggle from "../Extra Components/ThemeToggle";
import { FaBell } from "react-icons/fa6";

export default function DashboardNavbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-3 bg-[#D0E7F9]/80 dark:bg-[#0F172A]/80 shadow">
      <Link to="/dashboard" className="text-xl font-bold text-[#0F172A] dark:text-[#38BDF8]">
        Dashboard
      </Link>
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell className="text-[#38BDF8] text-xl" />
          {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
        </button>
        <ThemeToggle />
      </div>
    </nav>
  );
}