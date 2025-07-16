import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <>
      <motion.button
        onClick={toggleTheme}
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        whileTap={{ scale: 0.8, rotate: 90 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`w-9 h-9 rounded-full flex items-center justify-center border-1 transition-colors duration-300 focus:outline-none
          ${theme === "dark"
            ? "bg-[#0F172A] border-[#38BDF8] text-[#38BDF8] hover:bg-[#D0E7F9] hover:text-[#0F172A]"
            : "bg-[#D0E7F9] border-[#38BDF8] text-[#0F172A] hover:bg-[#38BDF8] hover:text-white"}
        `}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <FaSun className="text-lg" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.3 }}
            >
              <FaMoon className="text-lg" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <Tooltip
        id="theme-tooltip"
        place="bottom"
        effect="solid"
        delayShow={200}
        className="!bg-[#38BDF8] !text-[#0F172A] !rounded-lg !px-3 !py-1 text-xs"
      />
    </>
  );
};

export default ThemeToggle;
