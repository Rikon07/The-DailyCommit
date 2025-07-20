import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-white/30 via-[#1E293B]/20 to-white/30 dark:from-[#0F172A] dark:via-[#01202e] dark:to-[#0F172A] transition-colors duration-500 cabin">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + Description */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="text-2xl font-bold flex items-center gap-1 ciga tracking-wide text-[#0F172A] dark:text-[#38BDF8] transition"
          >
            <span className="drop-shadow-sm dark:drop-shadow-[0_0_10px_#38BDF8] flex gap-2 items-center">
              <span className="text-lg">The</span> <span>Daily<span className="text-[#38BDF8] dark:text-white">Commit</span></span>
            </span>
          </Link>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm">
            Stay committed to the latest in tech, startups, and open source. Daily updates. Developer focused.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[#0F172A] dark:text-[#38BDF8]">Quick Links</h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li><Link to="/" className="hover:text-black dark:hover:text-white">Home</Link></li>
            <li><Link to="/articles" className="hover:text-black dark:hover:text-white">Articles</Link></li>
            <li><Link to="/subscription" className="hover:text-black dark:hover:text-white">Subscription</Link></li>
          </ul>
        </motion.div>

        {/* Resources or Extra Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[#0F172A] dark:text-[#38BDF8]">Resources</h3>
          <ul className="space-y-2 text-slate-600 dark:text-slate-300">
            <li><a href="#" className="hover:text-black dark:hover:text-white">Write for Us</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black dark:hover:text-white">Terms of Use</a></li>
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-[#0F172A] dark:text-[#38BDF8]">Connect</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://www.youtube.com/results?search_query=learn+frontend+development" target="_blank" className="hover:text-[#FF0000]"><FaYoutube /></a>
            <a href="https://github.com/Rikon07" target="_blank" className="hover:text-[#6e5494]"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/rikon07/" target="_blank" className="hover:text-[#0077B5]"><FaLinkedin /></a>
            <a href="https://www.instagram.com/p/C7OtT7PSqk9/?utm_source=ig_web_copy_link" target="_blank" className="hover:text-[#E1306C]"><FaInstagram /></a>
            <a href="https://www.facebook.com/" target="_blank" className="hover:text-[#1877F2]"><FaFacebook /></a>
          </div>
        </motion.div>
      </div>

      <div className="text-center text-sm py-5 border-t border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} The Daily Commit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
