import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    title: "Free Plan",
    price: "Free",
    features: [
      "Read All Approved Articles",
      "Search by Publisher",
      "Light/Dark Theme Toggle",
      "Bookmark Articles",
    ],
    unavailable: [
      "Write Articles",
      "Priority Publisher Access",
    ],
    color: "bg-[#D0E7F9] text-[#223A5E] dark:bg-[#1e293b] dark:text-white border border-[#38BDF8]",
    buttonColor: "bg-[#38BDF8] text-white",
  },
  {
    title: "Premium Plan",
    price: "$4.99/month",
    features: [
      "All Free Features",
      "Write Articles (Pending Approval)",
      "Priority Review for Publishing",
      "Verified Badge on Profile",
    ],
    unavailable: [],
    color: "bg-[#D0E7F9] text-[#223A5E] dark:bg-[#1e293b] dark:text-white border border-orange-500",
    buttonColor: "bg-[#38BDF8] text-white",
  },
];

const Plans = () => {
  const navigate = useNavigate();

  return (
    <section className="py-6 lg:py-16 bg-[#D0E7F9]/30 dark:bg-[#0F172A] cabin" data-aos="fade-up">
      <div className="text-center mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] dark:text-[#D0E7F9]">Choose Your Plan</h2>
        <p className="text-[#475569] dark:text-[#94A3B8] mt-2 text-sm lg:text-base">Find what fits your content journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-2xl shadow-lg p-6 transition hover:scale-[1.01] flex flex-col gap-2 justify-between duration-300 ${plan.color}`}
          >
            <div>
                <h3 className="text-2xl font-semibold mb-1">{plan.title}</h3>
            <p className="text-lg font-medium mb-3">{plan.price}</p>

            <ul className="space-y-1 mb-6 text-sm">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="text-green-500" size={20} />
                  <span>{feature}</span>
                </li>
              ))}

              {plan.unavailable.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 opacity-60 line-through">
                  <X className="text-red-400" size={20} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            </div>

            <div>
                {/* <button
              onClick={() => navigate("/subscription")}
              className={`px-5 py-2 rounded-lg font-semibold hover:brightness-90 transition ${plan.buttonColor}`}
            >
              Subscribe Now
            </button> */}
            <button
            onClick={() => navigate("/subscription")} className="group relative inline-flex overflow-hidden rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-gradient-to-r from-pink-600 via-purple-600 to-[#0F172A]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-[#38BDF8] px-8 py-2 text-sm font-medium backdrop-blur-3xl transition-all duration-300 group-hover:bg-[#0F172A]">
        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="mr-2 h-5 w-5 text-pink-500 transition-transform duration-300 group-hover:-translate-x-1">
          <path d="M11 19l-7-7 7-7m8 14l-7-7 7-7" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
        <span className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text  font-semibold text-white/90">
          Subscribe Now
        </span>
        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="ml-2 h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1">
          <path d="M13 5l7 7-7 7M5 5l7 7-7 7" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </span>
    </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Plans;