import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaCrown } from "react-icons/fa6";
import useAuth from "../../Hooks/UseAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function HomepageModal() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch userInfo for premium check
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  const isUserPremium =
    userInfo?.premiumTaken && new Date(userInfo.premiumTaken) > new Date();

  useEffect(() => {
    if (!isUserPremium) {
      const timer = setTimeout(() => setShow(true), 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [isUserPremium]);

  if (isLoading || isUserPremium || !show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative bg-[#D0E7F9]/30 dark:bg-[#0F172A]/40 sfpro rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center"
        >
          <button
            className="absolute top-3 right-3 text-[#38BDF8] text-2xl font-bold hover:text-[#0EA5E9] transition"
            onClick={() => setShow(false)}
            aria-label="Close"
          >
            ×
          </button>
          <FaCrown className="text-4xl text-yellow-400 mb-2" />
          <h3 className="text-xl font-bold text-[#0F172A] dark:text-[#38BDF8] mb-2 text-center">
            Unlock Premium Features!
          </h3>
          <p className="text-[#223A5E] dark:text-[#D0E7F9] text-center mb-6">
            Get unlimited article posting, access exclusive premium content, and enjoy priority support. <br />
            <span className="font-semibold text-[#196687] dark:text-[#38BDF8]">Upgrade to Premium now!</span>
          </p>
          <button
            onClick={() => navigate("/subscription")}
            className="bg-[#38BDF8] hover:bg-[#0EA5E9] text-white px-8 py-1 rounded-full font-semibold text-sm shadow transition-all"
          >
            Go to Subscription
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}