import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaUsers, FaNewspaper, FaPlusCircle, FaChartPie, FaBars } from "react-icons/fa";
import ThemeToggle from "../Extra Components/ThemeToggle";

const navItems = [
  { to: "/dashboard", icon: <FaChartPie />, label: "Dashboard" },
  { to: "/dashboard/users", icon: <FaUsers />, label: "All Users" },
  { to: "/dashboard/articles", icon: <FaNewspaper />, label: "All Articles" },
  { to: "/dashboard/publishers", icon: <FaPlusCircle />, label: "Add Publisher" },
];

export default function DashboardSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#38BDF8] text-white p-2 rounded-full shadow"
        onClick={() => setOpen(true)}
      >
        <FaBars size={22} />
      </button>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 bg-[#D0E7F9]/90 dark:bg-[#0F172A]/90 shadow-xl
          flex flex-col gap-2 p-4 transition-transform duration-300
          w-64
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-20 lg:p-2
        `}
        style={{ minHeight: "100vh" }}
      >
        {/* Close button for mobile */}
        <button
          className="lg:hidden self-end mb-4 text-[#38BDF8] text-2xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium
              ${isActive ? "bg-[#38BDF8] text-white" : "text-[#0F172A] dark:text-[#D0E7F9] hover:bg-[#38BDF8]/10"}
              group relative`
            }
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden lg:group-hover:inline lg:absolute lg:left-16 lg:bg-[#38BDF8] lg:text-white lg:px-3 lg:py-1 lg:rounded-lg lg:shadow-lg lg:transition-all">
              {item.label}
            </span>
            <span className="lg:hidden">{item.label}</span>
          </NavLink>
        ))}
        <div className="mt-auto flex flex-col gap-2">
          <ThemeToggle />
          <Link to="/" className="text-center mt-2">
            <button className="bg-[#0F172A] w-full rounded-xl h-11 text-[#D0E7F9] text-xl font-semibold group">
              <span className="lg:hidden">Back to Home</span>
              <span className="hidden lg:inline-block">
                <svg width="25" height="25" fill="#38BDF8" viewBox="0 0 1024 1024">
                  <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z" />
                  <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z" />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </aside>
      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}