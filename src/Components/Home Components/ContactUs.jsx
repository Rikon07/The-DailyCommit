import { useRef, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { FaMapMarkerAlt, FaEnvelope, FaUser, FaCommentDots, FaPaperPlane } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import gsap from "gsap";
import { motion } from "framer-motion";

const BD_ARTICLES = [
  {
    title: "Dhaka AI Conference 2024",
    city: "Dhaka",
    lat: 23.8103,
    lng: 90.4125,
    publisher: "TechCrunch BD",
  },
  {
    title: "Chattogram Startup Expo",
    city: "Chattogram",
    lat: 22.3569,
    lng: 91.7832,
    publisher: "Startup Bangladesh",
  },
  {
    title: "Sylhet Cloud Summit",
    city: "Sylhet",
    lat: 24.8949,
    lng: 91.8687,
    publisher: "Cloud BD",
  },
  {
    title: "Rajshahi DevFest",
    city: "Rajshahi",
    lat: 24.3745,
    lng: 88.6042,
    publisher: "Dev Community",
  },
  {
    title: "Khulna Cybersecurity Meetup",
    city: "Khulna",
    lat: 22.8456,
    lng: 89.5403,
    publisher: "Cyber BD",
  },
  {
    title: "Barisal Data Science Day",
    city: "Barisal",
    lat: 22.701,
    lng: 90.3535,
    publisher: "Data Science BD",
  },
  {
    title: "Rangpur Robotics Workshop",
    city: "Rangpur",
    lat: 25.7439,
    lng: 89.2752,
    publisher: "Robotics BD",
  },
  {
    title: "Mymensingh Blockchain Bootcamp",
    city: "Mymensingh",
    lat: 24.7471,
    lng: 90.4203,
    publisher: "Blockchain Bangladesh",
  },
  {
    title: "Comilla Web Dev Meetup",
    city: "Comilla",
    lat: 23.4607,
    lng: 91.1809,
    publisher: "Web Dev BD",
  },
  {
    title: "Jessore IoT Hackathon",
    city: "Jessore",
    lat: 23.1667,
    lng: 89.2089,
    publisher: "IoT Bangladesh",
  },
];
const markerIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function ContactUs() {
  const center = [23.685, 90.3563];
  const mapSectionRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mapSectionRef.current) {
      gsap.fromTo(
        mapSectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#D0E7F9]/30 cabin dark:bg-[#0F172A] border-t border-[#38BDF8]/20 z-10 relative">
        <section className="max-w-6xl mx-auto py-16 lg:py-22 px-2">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#0F172A] dark:text-[#D0E7F9]">
        Contact Us
      </h2>
      <div className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Map */}
        <div
          ref={mapSectionRef}
          className="flex-1 bg-[#D0E7F9]/30 dark:bg-[#0F172A] rounded-2xl shadow-lg border-1 border-[#38BDF8] overflow-hidden"
        >
          <div className="flex items-center gap-2 justify-center">
            <FaMapMarkerAlt className="text-xl text-[#38BDF8]" />
            <span className="text-lg font-bold text-[#0F172A] dark:text-[#D0E7F9]">
              Our Locations
            </span>
          </div>
          <div className="w-full h-[450px]">
            <MapContainer
              center={center}
              zoom={7}
              scrollWheelZoom={true}
              className="w-full h-full"
              style={{ minHeight: "350px", minWidth: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {BD_ARTICLES.map((article, idx) => (
                <Marker
                  key={idx}
                  position={[article.lat, article.lng]}
                  icon={markerIcon}
                >
                  <Popup>
                    <div className="text-[#0F172A] dark:text-[#38BDF8]">
                      <strong>{article.title}</strong>
                      <br />
                      <span className="text-xs">{article.city}, Bangladesh</span>
                      <br />
                      <span className="text-xs text-[#38BDF8]">
                        {article.publisher}
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex-1 bg-white/80 dark:bg-[#223A5E]/80 backdrop-blur-lg rounded-2xl shadow-lg p-8 flex flex-col justify-center"
          onSubmit={e => {
            e.preventDefault();
            // You can add your form submission logic here (emailjs, API, etc)
            alert("Message sent! (Demo)");
          }}
        >
          <h3 className="text-xl font-bold mb-4 text-[#0F172A] dark:text-[#38BDF8] flex items-center gap-2">
            <FaEnvelope /> Send us a message
          </h3>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#0F172A] dark:text-[#D0E7F9]">
              <FaUser className="inline mr-1" /> Name
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#38BDF8]/40 bg-white dark:bg-[#1e293b] text-[#0F172A] dark:text-[#D0E7F9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 text-[#0F172A] dark:text-[#D0E7F9]">
              <FaEnvelope className="inline mr-1" /> Email
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 rounded-lg border border-[#38BDF8]/40 bg-white dark:bg-[#1e293b] text-[#0F172A] dark:text-[#D0E7F9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8]"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm mb-1 text-[#0F172A] dark:text-[#D0E7F9]">
              <FaCommentDots className="inline mr-1" /> Message
            </label>
            <textarea
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-[#38BDF8]/40 bg-white dark:bg-[#1e293b] text-[#0F172A] dark:text-[#D0E7F9] focus:outline-none focus:ring-2 focus:ring-[#38BDF8] resize-y"
              placeholder="Type your message here..."
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-[#0EA5E9] text-white px-6 py-2 rounded-full font-semibold shadow transition-all"
          >
            <FaPaperPlane /> Send Message
          </button>
        </motion.form>
      </div>
    </section>
    </div>
  );
}