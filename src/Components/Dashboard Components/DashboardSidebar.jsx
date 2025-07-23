import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUsers, FaNewspaper, FaPlusCircle, FaChartPie, FaChevronLeft } from "react-icons/fa";
import ThemeToggle from "../Extra Components/ThemeToggle";

const navItems = [
  { to: "/dashboard", icon: <FaChartPie />, label: "Dashboard" },
  { to: "/dashboard/users", icon: <FaUsers />, label: "All Users" },
  { to: "/dashboard/articles", icon: <FaNewspaper />, label: "All Articles" },
  { to: "/dashboard/publishers", icon: <FaPlusCircle />, label: "Add Publisher" },
];

export default function DashboardSidebar({ open, setOpen }) {
  const [hovered, setHovered] = useState(false);
  const location = useLocation();

  // Close sidebar on route change (mobile)
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname, setOpen]);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 bg-[#D0E7F9]/90 dark:bg-[#0F172A]/90 shadow-xl
          flex flex-col gap-2 pt-24 p-4 transition-all duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static
          ${hovered ? "lg:w-56" : "lg:w-20"}
        `}
        style={{ minHeight: "100vh" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Close button for mobile */}
        <button
          className="lg:hidden self-end mb-4 mt-1 text-[#38BDF8] text-2xl"
          onClick={() => setOpen(false)}
          aria-label="Close dashboard menu"
        >
          <FaChevronLeft />
        </button>

        {/* Nav links */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium
                ${isActive ? "bg-[#38BDF8] text-white" : "text-[#0F172A] dark:text-[#D0E7F9] hover:bg-[#38BDF8]/10"}
                group relative
                `
              }
              title={item.label}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={`ml-2 text-sm
                ${hovered ? "lg:inline" : "lg:hidden"} transition-all duration-800`}>
                {item.label}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* ThemeToggle after links */}
        <div className="my-4 flex justify-center">
          <ThemeToggle />
        </div>

        <div className=" flex flex-col gap-2">
          
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