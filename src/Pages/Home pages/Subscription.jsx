import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const periods = [
  { label: "1 Minute", value: 1, price: 1 },
  { label: "5 Days", value: 5 * 24 * 60, price: 5 },
  { label: "10 Days", value: 10 * 24 * 60, price: 10 },
];

const Subscription = () => {
  const [selected, setSelected] = useState(periods[0]);
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const queryClient = useQueryClient();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const { data } = await axiosSecure.post("/create-payment-intent", {
      price: selected.price,
    });

    const card = elements.getElement(CardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: { card },
    });

    if (error) {
      Swal.fire({
        title: "Payment Failed",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#38BDF8",
        background: "#D0E7F9",
        color: "#0F172A",
      });
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      const now = new Date();
      const expiry = new Date(now.getTime() + selected.value * 60 * 1000);
      await axiosSecure.patch(`/users/premium/${user.email}`, { 
        premiumTaken: expiry.toISOString(),
        type: "premium"
      });

      await queryClient.invalidateQueries(["userInfo", user.email]);

      await Swal.fire({
        title: "Payment Successful!",
        text: "You are now a premium user. Enjoy your benefits!",
        icon: "success",
        confirmButtonColor: "#38BDF8",
        background: "#D0E7F9",
        color: "#0F172A",
      });
      navigate("/");
    }
    setProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-[68vh] flex items-center justify-center">
        <span className="text-[#38BDF8] font-bold text-xl animate-pulse">Loading...</span>
      </div>
    );
  }

  if (isUserPremium) {
    return (
      <div className="min-h-[68vh] flex items-center justify-center bg-gradient-to-br from-[#D0E7F9] via-[#38BDF8]/30 to-white dark:from-[#0F172A] dark:via-[#223A5E]/60 dark:to-[#0F172A] cabin">
        <div className="w-full max-w-lg text-center bg-white/90 dark:bg-[#223A5E]/90 rounded-2xl shadow-xl p-10 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-[#38BDF8] mb-2">
            🎉 You are already a Premium Member!
          </h1>
          <p className="text-[#223A5E] dark:text-[#D0E7F9] text-base">
            Enjoy unlimited article posting, exclusive premium content, and priority support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[68vh] flex items-center justify-center bg-gradient-to-br from-[#D0E7F9] via-[#38BDF8]/30 to-white dark:from-[#0F172A] dark:via-[#223A5E]/60 dark:to-[#0F172A] cabin">
      <div className="w-full flex flex-col items-center">
        {/* Welcoming Text Block */}
        <div className="w-full max-w-lg mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#0F172A] dark:text-[#38BDF8] mb-2">
            Become a Premium Member!
          </h1>
          <p className="text-[#223A5E] dark:text-[#D0E7F9] text-base">
            Unlock unlimited article posting, access exclusive premium content, and enjoy priority support.
            Choose your subscription period and join our community of passionate developers!
          </p>
        </div>
        {/* Subscription Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#D0E7F9]/90 dark:bg-[#1e293b]/90 rounded-2xl shadow-xl p-8 w-full max-w-sm flex flex-col gap-6"
          style={{ backdropFilter: "blur(6px)" }}
        >
          <h2 className="text-xl font-bold text-center mb-2 text-[#0F172A] dark:text-[#D0E7F9]">
            Your Card Information
          </h2>
          <div className="mb-2">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "18px",
                    color: "#38BDF8",
                    "::placeholder": { color: "#D0E7F9" },
                    backgroundColor: "transparent",
                  },
                  invalid: { color: "#e53e3e" },
                },
              }}
              className="p-3 rounded-lg border border-[#38BDF8] bg-white dark:bg-[#223A5E]/40"
            />
          </div>
          <select
            aria-label="Select subscription period"
            value={selected.label}
            onChange={e => setSelected(periods.find(p => p.label === e.target.value))}
            className="p-3 rounded-lg border border-[#38BDF8] bg-white dark:bg-[#223A5E]/40 text-[#0F172A] dark:text-[#D0E7F9]"
          >
            {periods.map(period => (
              <option key={period.label} value={period.label}>
                {period.label} — ৳{period.price * 110}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full border-2 border-[#38BDF8] text-[#0F172A] dark:text-[#D0E7F9] font-bold py-2 rounded-lg bg-[#38BDF8]/90 hover:bg-[#0EA5E9] dark:bg-[#223A5E]/80 transition"
            aria-label="Pay and subscribe"
          >
            {processing ? "Processing..." : "PAY"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Subscription;