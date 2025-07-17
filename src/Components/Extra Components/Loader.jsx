import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-t from-white/60 via-[#1E293B]/20 to-white/60 
      dark:from-[#0F172A] dark:via-[#1E293B] dark:to-[#0F172A]">
      <RingLoader color="#38BDF8" size={100} />
    </div>
  );
};

export default Loader;
