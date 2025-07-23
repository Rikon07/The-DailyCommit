import { FaBars } from "react-icons/fa";
import  useAuth  from "../../Hooks/UseAuth";
import { Link } from "react-router";

export default function DashboardNavbar({ onMenuClick }) {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white/60 dark:bg-[#0F172A]/70 backdrop-blur-lg shadow">
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden text-[#38BDF8] p-2 rounded-full shadow"
        onClick={onMenuClick}
        aria-label="Open dashboard menu"
      >
        <FaBars size={22} />
      </button>
      <div className="text-xl font-bold text-[#0F172A] dark:text-[#38BDF8]">Dashboard</div>
      <div className="flex items-center gap-2">
         <Link to="/">
            <button
              className="bg-[#0F172A] text-center w-32 lg:w-48 rounded-2xl h-9 lg:h-11 relative text-[#D0E7F9] text-xl font-semibold group overflow-hidden"
              type="button"
            >
              <div className="bg-[#38BDF8] rounded-xl h-7 lg:h-9 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[120px] lg:group-hover:w-[184px] z-10 duration-500">
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
              <p className="translate-x-5 text-xs lg:text-base">Back to Home</p>
            </button>
          </Link>
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-[#38BDF8] object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#38BDF8] flex items-center justify-center text-white font-bold">
            {user?.displayName?.[0] || "A"}
          </div>
        )}
       
      </div>
    </nav>
  );
}