import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
export default function AllPublisher() {
  const axiosSecure = useAxiosSecure();
const pubRef = useRef(null);

useEffect(() => {
    gsap.fromTo(
      pubRef.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1, delay: 0.4, ease: "power2.out" }
    );
  }, []);
  // Fetch all publishers
  const { data: publishers = [], isLoading } = useQuery({
    queryKey: ["all-publishers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/publishers");
      return res.data;
    },
  });

  return (
    <div ref={pubRef} className="bg-[#D0E7F9]/30 dark:bg-[#0F172A] border-t border-[#38BDF8]/20">
        <section className="max-w-5xl cabin mx-auto py-10 md:py-14 px-3 md:px-6">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0F172A] dark:text-[#D0E7F9]">
        All Publishers
      </h2>
      <p className="text-[#475569] dark:text-[#94A3B8] mt-2 text-sm lg:text-base  text-center">Get to know the Publishers</p>
      </div>
      <div className="relative w-full">
        {isLoading ? (
          <div className="flex gap-8 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="w-24 h-24 rounded-full bg-[#D0E7F9] dark:bg-[#223A5E] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={3}
            slidesPerView={3}
            autoplay={{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }}
            speed={5500}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="publisher-swiper"
            style={{ padding: "12px 0" }}
          >
            {publishers.map((pub, idx) => (
              <SwiperSlide key={pub._id || idx}>
                <PublisherLogoOverlay logo={pub.logo} name={pub.name} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
    </div>
  );
}

// Logo with name overlay on hover
// function PublisherLogoOverlay({ logo, name }) {
//   return (
//     <div className="relative flex items-center justify-center group cursor-pointer w-24 h-24 md:w-28 md:h-28 mx-auto">
//       <img
//         src={logo}
//         alt={name}
//         className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-[#38BDF8] bg-white dark:bg-[#223A5E] transition-transform duration-300 group-hover:scale-105"
//         draggable={false}
//       />
//       <AnimatePresence>
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: 10 }}
//           transition={{ duration: 0.25 }}
//           className="w-24 h-24 md:w-24 md:h-24 absolute inset-2 flex items-center justify-center rounded-2xl bg-white/20 dark:bg-[#0F172A]/20 backdrop-blur-md shadow text-[#0F172A] dark:text-[#38BDF8] font-bold text-xs opacity-0 hover:opacity-100 pointer-events-none"
//           style={{
//             transition: "opacity 0.25s, backdrop-filter 0.25s",
//           }}
//         >
//           {name}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   );
// }

function PublisherLogoOverlay({ logo, name }) {
  return (
    <div className="relative flex items-center justify-center group cursor-pointer w-24 h-24 md:w-28 md:h-28 mx-auto">
      <img
        src={logo}
        alt={name}
        className="w-full h-full object-cover rounded-2xl shadow-lg border-2 border-[#38BDF8] bg-white dark:bg-[#223A5E] transition-transform duration-300 group-hover:scale-105"
        draggable={false}
      />
      <motion.div
        className="absolute inset-1 flex items-center justify-center rounded-2xl bg-white/20 dark:bg-[#0F172A]/20 backdrop-blur-md shadow text-[#0F172A] font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        {name}
      </motion.div>
    </div>
  );
}
