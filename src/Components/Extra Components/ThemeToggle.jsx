import { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } 
    // Optional fallback
    // else {
    //   setTheme("light");
    // }
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
      <button
        onClick={toggleTheme}
        data-tooltip-id="theme-tooltip"
        data-tooltip-content={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 focus:outline-none
          ${theme === "dark"
            ? "bg-[#223A5E] border-[#4FD1C5] text-[#4FD1C5] hover:bg-[#D0E7F9] hover:text-[#223A5E]"
            : "bg-[#D0E7F9] border-[#4FD1C5] text-[#223A5E] hover:bg-[#4FD1C5] hover:text-[#F7FAFC]"}
        `}
      >
        {theme === "dark" ? (
          <FaSun className="text-[#4FD1C5] text-xl" />
        ) : (
          <FaMoon className="text-[#223A5E] text-xl" />
        )}
      </button>
      <Tooltip 
        id="theme-tooltip" 
        place="bottom" 
        effect="solid"
        delayShow={200}
        className="!bg-[#4FD1C5] !text-[#223A5E] !rounded-lg !px-3 !py-1 text-sm"
      />
    </>
  );
};

export default ThemeToggle;