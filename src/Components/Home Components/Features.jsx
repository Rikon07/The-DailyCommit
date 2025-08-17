import React from "react";
import { useId } from "react";
import { motion } from "framer-motion";
// export function FeaturesSectionDemo() {
//   return (
//     <div className="bg-gradient-to-b from-[#38BDF8]/20 to-to-[#D0E7F9]/30 dark:from-[#0F172A] dark:to-[#223A5E]/40 py-20 lg:py-40">
//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 max-w-7xl mx-auto">
//         {grid.map((feature) => (
//           <div
//             key={feature.title}
//             className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden">
//             <Grid size={20} />
//             <p
//               className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
//               {feature.title}
//             </p>
//             <p
//               className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
//               {feature.description}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export function FeaturesSection() {
  return (
    <div className="bg-[#D0E7F9]/30 dark:bg-[#0F172A] border-t border-[#38BDF8]/20 py-6 lg:py-16 cabin">
        <div className="text-center mb-4">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#0F172A] dark:text-[#D0E7F9]">Features</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
        {grid.map((feature, idx) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{
              scale: 1.06,
              boxShadow: "0 0 32px 0 #38BDF8, 0 0 0 0px #38BDF8",
              background: "linear-gradient(135deg,rgba(56,189,248,0.10),rgba(255,255,255,0.10))",
            }}
            className="relative bg-white/70 dark:bg-[#223A5E]/80 backdrop-blur-lg border border-[#38BDF8]/30 rounded-3xl overflow-hidden shadow-lg transition-all duration-300 group p-4"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-[#0F172A] dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-[#475569] dark:text-[#CBD5E1] mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
const grid = [
  {
    title: "Write Articles",
    description: "Share your knowledge, insights, and news with the global developer community in seconds.",
  },
  {
    title: "Easy Article Submission",
    description: "Add articles with a beautiful editor and get them published after admin approval.",
  },
  {
    title: "Easy Pricing",
    description: "Start for free, upgrade to premium for unlimited posts and exclusive content.",
  },
  {
    title: "Dev Newses",
    description: "Stay updated with the latest in computer science, open source, and tech trends.",
  },
  {
    title: "Great Community",
    description: "Connect with top contributors, join discussions, and grow your network.",
  },
  {
    title: "Premium Content",
    description: "Unlock premium articles, priority publishing, and more with a subscription.",
  },
  {
    title: "Real-Time Analytics",
    description: "Track your article views, engagement, and community impact instantly.",
  },
  {
    title: "Modern UI/UX",
    description: "Enjoy a fast, responsive, and glassy interface with dark/light mode and animations.",
  },
];


export const Grid = ({
  pattern,
  size
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div
        className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10" />
      </div>
    </div>
  );
};

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}>
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height} />
          ))}
        </svg>
      )}
    </svg>
  );
}
