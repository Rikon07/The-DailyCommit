import { motion } from "framer-motion";

const features = [
  {
    title: "Write Articles",
    description: "Share your knowledge, insights, and news with the global developer community in seconds.",
    size: "row-span-2 col-span-2",
    icon: "📝",
  },
  {
    title: "Easy Article Submission",
    description: "Add articles with a beautiful editor and get them published after admin approval.",
    size: "col-span-1",
    icon: "🚀",
  },
  {
    title: "Easy Pricing",
    description: "Start for free, upgrade to premium for unlimited posts and exclusive content.",
    size: "col-span-1",
    icon: "💸",
  },
  {
    title: "Dev Newses",
    description: "Stay updated with the latest in computer science, open source, and tech trends.",
    size: "col-span-1",
    icon: "📰",
  },
  {
    title: "Great Community",
    description: "Connect with top contributors, join discussions, and grow your network.",
    size: "col-span-1",
    icon: "🤝",
  },
  {
    title: "Premium Content",
    description: "Unlock premium articles, priority publishing, and more with a subscription.",
    size: "col-span-2",
    icon: "⭐",
  },
  {
    title: "Real-Time Analytics",
    description: "Track your article views, engagement, and community impact instantly.",
    size: "col-span-1",
    icon: "📊",
  },
  {
    title: "Modern UI/UX",
    description: "Enjoy a fast, responsive, and glassy interface with dark/light mode and animations.",
    size: "col-span-1",
    icon: "🎨",
  },
];

export default function BentoFeatures() {
  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#0F172A] dark:text-[#38BDF8]">
        Why Choose The Daily Commit?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[180px] gap-4">
        {features.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 32px 0 #38BDF8, 0 0 0 2px #38BDF8",
              background: "linear-gradient(135deg,rgba(56,189,248,0.10),rgba(255,255,255,0.10))",
            }}
            className={`
              ${feature.size}
              relative rounded-2xl shadow-lg p-6 flex flex-col justify-center items-center
              bg-white/80 dark:bg-[#223A5E]/80 backdrop-blur-lg border border-[#38BDF8]/20
              transition-all duration-300 group cursor-pointer
            `}
          >
            <div className="text-4xl mb-2">{feature.icon}</div>
            <div className="text-lg font-bold text-[#0F172A] dark:text-[#38BDF8] text-center">
              {feature.title}
            </div>
            <div className="text-sm text-[#475569] dark:text-[#CBD5E1] mt-2 text-center">
              {feature.description}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}