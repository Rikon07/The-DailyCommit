// import React from "react";

// export default function GlowingCard({ children, glowColor = "#38BDF8", className = "" }) {
//   return (
//     <div
//       className={`relative min-w-[14rem] p-6 rounded-2xl text-black dark:text-white bg-background border transition-all duration-400 ease-out ${className}`}
//       style={{
//         boxShadow: `0 0 24px 0 ${glowColor}55, 0 0 0 2px ${glowColor}55`,
//         borderColor: glowColor,
//         background: "rgba(255,255,255,0.85)",
//         backdropFilter: "blur(6px)",
//       }}
//     >
//       {children}
//     </div>
//   );
// }

import React from "react";

export default function GlowingCard({ children, glowColor = "#38BDF8", className = "" }) {
  return (
    <div
      className={`relative min-w-[14rem] p-6 rounded-2xl text-black dark:text-white border transition-all duration-400 ease-out ${className}`}
      style={{
        boxShadow: `0 0 24px 0 ${glowColor}55, 0 0 0 2px ${glowColor}55`,
        borderColor: glowColor,
        background:
          "linear-gradient(135deg,rgba(255,255,255,0.85) 60%,rgba(56,189,248,0.08)),rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none z-0
        bg-[#D0E7F9]/30 dark:bg-[#0F172A]/95 transition-colors duration-300" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}