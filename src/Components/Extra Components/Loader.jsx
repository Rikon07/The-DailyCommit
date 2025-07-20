import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-t from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <RingLoader color="#38BDF8" size={100} />
    </div>
  );
};

export default Loader;
