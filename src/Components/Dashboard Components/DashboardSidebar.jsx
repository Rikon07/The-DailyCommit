// DashboardSidebar.jsx
import { Link, NavLink } from "react-router-dom";
import { FaUsers, FaNewspaper, FaPlusCircle, FaChartPie } from "react-icons/fa";
import ThemeToggle from "../Extra Components/ThemeToggle";

const navLinkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium ${
    isActive
      ? "bg-[#38BDF8] text-white"
      : "text-[#0F172A] dark:text-[#D0E7F9] hover:bg-[#38BDF8]/10"
  }`;

export default function DashboardSidebar() {
  return (
    <aside className="bg-[#D0E7F9]/60 dark:bg-[#0F172A]/80 min-h-screen w-64 p-6 flex flex-col gap-2 shadow-xl">
      <NavLink to="/dashboard" className={navLinkClass}>
        <FaChartPie /> Dashboard
      </NavLink>
      <NavLink to="/dashboard/users" className={navLinkClass}>
        <FaUsers /> All Users
      </NavLink>
      <NavLink to="/dashboard/articles" className={navLinkClass}>
        <FaNewspaper /> All Articles
      </NavLink>
      <NavLink to="/dashboard/publishers" className={navLinkClass}>
        <FaPlusCircle /> Add Publisher
      </NavLink>
      <ThemeToggle />
      <Link to="/">
                <button
                  className="bg-[#0F172A] text-center w-48 rounded-2xl h-11 relative text-[#D0E7F9] text-xl font-semibold group"
                  type="button"
                >
                  <div className="bg-[#38BDF8] rounded-xl h-9 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1024 1024"
                      height="25px"
                      width="25px"
                    >
                      <path
                        d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                        fill="#000000"
                      />
                      <path
                        d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                        fill="#000000"
                      />
                    </svg>
                  </div>
                  <p className="translate-x-5 text-base">Back to Home</p>
                </button>
              </Link>
    </aside>
  );
}