import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import { motion } from "framer-motion";
import { FaCrown } from "react-icons/fa6";

const periods = [
  { label: "1 Minute", value: 1, price: 1 },
  { label: "5 Days", value: 5 * 24 * 60, price: 5 },
  { label: "10 Days", value: 10 * 24 * 60, price: 10 },
];

const Subscription = () => {
  const [selected, setSelected] = useState(periods[0]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    const now = new Date();
    const expiry = new Date(now.getTime() + selected.value * 60 * 1000); // value in minutes
    try {
      await axiosSecure.patch(`/users/premium/${user.email}`, { premiumTaken: expiry.toISOString() });
      toast.success("Subscription successful!");
      navigate("/payment");
    } catch (err) {
      toast.error("Subscription failed!");
    }
  };

  return (
    <motion.div
      className="min-h-[68vh] flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-[#D0E7F9]/60 via-[#38BDF8]/10 to-white dark:from-[#0F172A] dark:via-[#1e293b] dark:to-[#0F172A]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Banner */}
      <motion.div
        className="w-full max-w-2xl mx-auto flex items-center gap-4 bg-[#38BDF8]/90 dark:bg-[#1e293b]/80 rounded-2xl shadow-lg px-6 py-6 mb-8"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <FaCrown className="text-yellow-400 text-4xl drop-shadow-lg" />
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#D0E7F9]">
            Upgrade to Premium
          </h2>
          <p className="text-[#223A5E] dark:text-[#94A3B8] text-sm md:text-base mt-1">
            Unlock unlimited articles, premium content, and more!
          </p>
        </div>
      </motion.div>

      {/* Subscription Card */}
      <motion.div
        className="w-full max-w-md bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-8 flex flex-col gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <label className="block mb-2 text-[#223A5E] dark:text-[#D0E7F9] font-semibold">
            Select Subscription Period
          </label>
          <select
            value={selected.label}
            onChange={e => setSelected(periods.find(p => p.label === e.target.value))}
            className="w-full p-3 rounded-lg border border-[#38BDF8] bg-[#D0E7F9]/40 dark:bg-[#0F172A]/60 text-[#223A5E] dark:text-[#D0E7F9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] transition"
          >
            {periods.map(period => (
              <option key={period.label} value={period.label}>
                {period.label} — ${period.price}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Summary */}
        <div className="flex items-center gap-4 bg-[#D0E7F9]/60 dark:bg-[#223A5E]/40 rounded-lg p-4">
          <FaCrown className="text-yellow-400 text-2xl" />
          <div>
            <div className="font-semibold text-[#0F172A] dark:text-[#D0E7F9]">
              {selected.label} Premium Access
            </div>
            <div className="text-[#475569] dark:text-[#94A3B8] text-sm">
              Price: <span className="font-bold">${selected.price}</span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSubscribe}
          className="w-full bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white font-semibold py-3 rounded-lg shadow-md hover:from-[#0EA5E9] hover:to-[#38BDF8] transition-all"
        >
          Take Subscription (${selected.price})
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Subscription;