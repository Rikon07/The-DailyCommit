import { Outlet, Link } from "react-router";
import ThemeToggle from "../Components/Extra Components/ThemeToggle";

const AuthLayout = () => {
  return (
    <div className=" bg-gradient-to-t from-white/60 via-[#1E293B]/20 to-white/60 dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A] text-gray-800 dark:text-white">
      <nav className="flex max-w-7xl mx-auto justify-between items-center px-6 py-4 border-b border-slate-300 dark:border-slate-700">
        {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-1 ciga tracking-wide text-[#0F172A] dark:text-[#38BDF8] transition"
      >
        <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#38BDF8] flex gap-2 items-center">
          <span className="text-lg">The</span> <span>Daily<span className="text-[#38BDF8] dark:text-white">Commit</span></span>
        </span>
      </Link>
        <ThemeToggle />
      </nav>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
