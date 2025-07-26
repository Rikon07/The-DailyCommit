import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import ThemeToggle from "../Extra Components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/UseAuth";
import useAdmin from "../../Hooks/useAdmin";
import axios from "../../Hooks/Axios";
import { Tooltip } from "react-tooltip";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);
  // Fetch user info from backend for premium check
  // useEffect(() => {
  //   if (user?.email) {
  //     axios
  //       .get(`/users/${user.email}`)
  //       .then((res) => setUserInfo(res.data))
  //       .catch(() => setUserInfo(null));
  //   } else {
  //     setUserInfo(null);
  //   }
  // }, [user]);
  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isPremium =
    userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date();

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

  useEffect(() => {
    const htmlElement = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");
    });
    setTheme(htmlElement.classList.contains("dark") ? "dark" : "light");
    observer.observe(htmlElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // const navLinkStyle = ({ isActive }) =>
  //   `transition-colors duration-200 hover:text-[#38BDF8] ${
  //     isActive ? "font-bold underline underline-offset-4 text-[#38BDF8]" : ""
  //   }`;
  const navLinkStyle = ({ isActive }) =>
  `transition-colors duration-200 hover:text-[#38BDF8] px-3 py-1 rounded-lg text-[#0F172A] dark:text-[#D0E7F9]
   ${isActive
      ? "font-bold border text-[#38BDF8] border-[#38BDF8]/40 dark:bg-[#223A5E]/40 shadow backdrop-blur-xl"
      : ""} ${!isActive ? "hover:underline underline-offset-4 transition-colors duration-200" : ""}`;

  // Desktop Links
  const Links = (
  <>
    <li>
      <NavLink to="/" className={navLinkStyle}>
        Home
      </NavLink>
    </li>
    {/* Articles Dropdown (hover) */}
    <li
      className="relative group"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        className="flex items-center gap-1 transition-colors duration-200 hover:text-[#38BDF8] font-medium hover:underline underline-offset-4"
        type="button"
      >
        Articles
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute text-sm left-0 mt-3 w-56 bg-white/95 dark:bg-[#223A5E] rounded-xl shadow-2xl ring-1 ring-[#38BDF8]/30 z-50 py-2"
          >
            <li>
              <NavLink to="/articles" className="block px-5 py-2 hover:bg-[#38BDF8]/10 dark:hover:bg-[#38BDF8]/20 hover:text-[#38BDF8] rounded-lg transition">
                All Articles
              </NavLink>
            </li>
            {user && (
              <>
                <li>
                  <NavLink to="/add-article" className="block px-5 py-2 hover:bg-[#38BDF8]/10 dark:hover:bg-[#38BDF8]/20 rounded-lg transition hover:text-[#38BDF8]">
                    Add Article
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/my-articles" className="block px-5 py-2 hover:bg-[#38BDF8]/10 dark:hover:bg-[#38BDF8]/20 rounded-lg transition hover:text-[#38BDF8]">
                    My Articles
                  </NavLink>
                </li>
              </>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
    {user && (
      <li>
        <NavLink to="/subscription" className={navLinkStyle}>
          Subscription
        </NavLink>
      </li>
    )}
    {isPremium && (
      <li>
        <NavLink to="/premium-articles" className={navLinkStyle}>
          Premium Articles
        </NavLink>
      </li>
    )}
    {isAdmin && (
      <li>
        <NavLink to="/dashboard" className={navLinkStyle}>
          Dashboard
        </NavLink>
      </li>
    )}
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
      <ul className="hidden lg:flex gap-8 text-[#0F172A] dark:text-[#D0E7F9] items-center">
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
          <Link to="/profile" className="flex items-center gap-2">
            {user.photoURL ? (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border-2 border-[#38BDF8] object-cover"
                  data-tooltip-id="profile-tooltip"
                  data-tooltip-content={user.displayName || user.email}
                />
                <Tooltip
                  id="profile-tooltip"
                  place="bottom"
                  effect="solid"
                  className="!bg-[#38BDF8] !text-[#0F172A] !rounded-lg !px-4 !py-2 !font-semibold"
                />
              </>
            ) : (
              <FaUserCircle
                className="text-3xl text-[#38BDF8]"
                data-tooltip-id="profile-tooltip"
                data-tooltip-content={user.displayName || user.email}
              />
            )}
          </Link>
        )}
        {user && (
          <button
            onClick={handleLogOut}
            className="ml-2 border border-[#38BDF8] text-[#38BDF8] px-4 py-2 rounded-xl font-semibold hover:bg-[#38BDF8] hover:text-[#0F172A] transition-all duration-200 shadow-sm text-sm"
          >
            Logout
          </button>
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
            <ThemeToggle />
            <ul className="space-y-2 text-[#0F172A] dark:text-[#D0E7F9]">
              <li>
    <NavLink to="/" className={navLinkStyle}>
      Home
    </NavLink>
  </li>
  {/* Articles Dropdown for mobile */}
  <li>
    <details>
      <summary className="cursor-pointer">Articles</summary>
      <ul className="ml-4 space-y-1">
        <li>
          <NavLink to="/articles" className={navLinkStyle}>
            All Articles
          </NavLink>
        </li>
        {user && (
          <>
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
          </>
        )}
      </ul>
    </details>
  </li>
  {user && (
    <li>
      <NavLink to="/subscription" className={navLinkStyle}>
        Subscription
      </NavLink>
    </li>
  )}
  {isAdmin && (
    <li>
      <NavLink to="/dashboard" className={navLinkStyle}>
        Dashboard
      </NavLink>
    </li>
  )}
  {isPremium && (
    <li>
      <NavLink to="/premium-articles" className={navLinkStyle}>
        Premium Articles
      </NavLink>
    </li>
  )}
              {user && (
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
            {user.photoURL ? (
              <>
                <img
                  src={user.photoURL}
                  alt="User"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full border-2 border-[#38BDF8] object-cover"
                  data-tooltip-id="profile-tooltip"
                  data-tooltip-content={user.displayName || user.email}
                />
                <Tooltip
                  id="profile-tooltip"
                  place="bottom"
                  effect="solid"
                  className="!bg-[#38BDF8] !text-[#0F172A] !rounded-lg !px-4 !py-2 !font-semibold"
                />
              </>
            ) : (
              <FaUserCircle
                className="text-3xl text-[#38BDF8]"
                data-tooltip-id="profile-tooltip"
                data-tooltip-content={user.displayName || user.email}
              />
            )}
          </Link>
                </li>
              )}
              {!user ? (
                <>
                  <li>
                    <Link to="/login" className={navLinkStyle}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className={navLinkStyle}>
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogOut}
                    className="w-full border border-[#38BDF8] text-[#38BDF8] py-2 rounded-lg text-sm font-semibold hover:bg-[#38BDF8] hover:text-[#223A5E]"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;