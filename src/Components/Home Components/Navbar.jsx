import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "../Extra Components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";

const Navbar = () => {
  // const user = null;
  const { user, logOut } = useAuth();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully!",
          icon: "success",
          background: theme === "dark" ? "#223A5E" : "#D0E7F9",
          color: theme === "dark" ? "#90D1CA" : "#096B68",
          confirmButtonColor: "#4FD1C5",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Logout Failed",
          text: "Something went wrong while logging out.",
          icon: "error",
          background: theme === "dark" ? "#223A5E" : "#D0E7F9",
          color: theme === "dark" ? "#90D1CA" : "#096B68",
          confirmButtonColor: "#4FD1C5",
          confirmButtonText: "Try Again",
        });
      });
  };
  ("");

  const [theme, setTheme] = useState("");
  useEffect(() => {
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");
    });

    setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 hover:text-[#38BDF8] ${
      isActive ? "font-bold underline underline-offset-4 text-[#38BDF8]" : ""
    }`;

  const Links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/articles" className={navLinkStyle}>
          Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-article" className={navLinkStyle}>
          Add Article
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-articles" className={navLinkStyle}>
          My Articles
        </NavLink>
      </li>
      <li>
        <NavLink to="/subscription" className={navLinkStyle}>
          Subscriptions
        </NavLink>
      </li>
    </>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`cabin fixed z-50 top-0 left-1/2 -translate-x-1/2 w-full px-6 md:px-10 lg:px-14 xl:px-50 py-4 rounded-lg shadow-xl flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-[#D0E7F9]/20 dark:bg-[#0F172A]/20 backdrop-blur-xl"
          : "bg-[#D0E7F9]/30 dark:bg-[#0F172A]/30"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold flex items-center gap-1 ciga tracking-wide text-[#0F172A] dark:text-[#38BDF8] transition"
      >
        <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#38BDF8] flex gap-2 items-center">
          <span className="text-lg">The</span> <span>Daily<span className="text-[#38BDF8] dark:text-white">Commit</span></span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden lg:flex gap-8 text-[#0F172A] dark:text-[#D0E7F9]">
        {Links}
      </ul>

      {/* Right section */}
      <div className="hidden lg:flex items-center gap-5">
        <ThemeToggle />
        {!user ? (
          <>
            <Link to="/login">
              <button className="bg-[#38BDF8] text-[#0F172A] px-5 py-2 rounded-xl font-semibold hover:scale-105 hover:bg-[#0EA5E9] hover:text-white transition-all duration-200 shadow-sm text-sm">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="border border-[#38BDF8] text-[#38BDF8] px-5 py-2 rounded-xl font-semibold hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-200 shadow-sm text-sm">
                Register
              </button>
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end dropdown-hover">
            <div tabIndex={0} role="button" className="cursor-pointer">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-[#38BDF8]"
                />
              ) : (
                <FaUserCircle className="text-3xl text-[#38BDF8]" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-3 space-y-1 bg-[#D0E7F9] dark:bg-[#1d314f] shadow-md rounded-xl w-52 z-50"
            >
              <li className="px-4 py-2 text-[#223A5E] hover:text-[#D0E7F9] dark:text-[#D0E7F9] dark:hover:text-[#223A5E] font-medium rounded-xl hover:bg-[#223A5E] dark:hover:bg-[#D0E7F9]">
                {user.displayName || "User"}
              </li>
              <li>
                <Link
                  to="/profile"
                  className="px-4 py-2 hover:text-[#38BDF8] rounded-xl hover:underline hover:bg-[#223A5E] dark:hover:bg-[#D0E7F9] transition"
                >
                  My Profile
                </Link>
              </li>
              <li className="px-1 py-2">
                <button
                  onClick={handleLogOut}
                  className="text-sm text-left px-3 py-1 rounded-xl  text-[#223A5E] hover:text-[#D0E7F9] dark:text-[#D0E7F9] dark:hover:text-[#223A5E] border border-[#38BDF8] hover:bg-[#223A5E] dark:hover:bg-[#D0E7F9] transition"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile menu toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#0F172A] dark:text-[#38BDF8] text-3xl"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-[100%] mt-2 left-0 w-full bg-[#D0E7F9] dark:bg-[#0F172A] rounded-xl shadow-xl p-5 lg:hidden flex flex-col gap-4 z-40"
          >
            <ul className="space-y-2 text-[#0F172A] dark:text-[#D0E7F9]">
              {Links}
            </ul>
            {!user ? (
              <>
                <ThemeToggle />
                <Link to="/login">
                  <button className="w-full bg-[#38BDF8] text-[#0F172A] py-2 rounded-xl font-semibold hover:bg-[#0EA5E9] hover:text-white transition">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="w-full border border-[#38BDF8] text-[#38BDF8] py-2 rounded-xl font-semibold hover:bg-[#38BDF8] hover:text-[#0F172A] transition">
                    Register
                  </button>
                </Link>
              </>
            ) : (
              <FaUserCircle className="text-3xl text-[#38BDF8]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
