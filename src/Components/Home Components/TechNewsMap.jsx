import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import { FaMapMarkerAlt } from "react-icons/fa";
import "leaflet/dist/leaflet.css";
import { useRef, useEffect } from "react";
import gsap from "gsap";

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
    lat: 22.7010,
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

// Custom marker icon
const markerIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export default function TechNewsMap() {
  // Center on Bangladesh
  const center = [23.685, 90.3563];
const mapRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power2.out" }
    );
  }, []);
  return (
    <div ref={mapRef} className='bg-[#D0E7F9]/30 cabin dark:bg-[#0F172A] border-t border-[#38BDF8]/20'>
      <section className="max-w-5xl mx-auto py-12 px-4">
      <div className="flex items-center gap-2 mb-4 justify-center">
        <FaMapMarkerAlt className="text-2xl text-[#38BDF8]" />
        <span className="text-2xl md:text-3xl font-bold text-[#0F172A] dark:text-[#D0E7F9]">
          Locations
        </span>
      </div>
      <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-2 border-[#38BDF8]">
        <MapContainer center={center} zoom={7} scrollWheelZoom={true} className="w-full h-full">
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
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
                  <span className="text-xs text-[#38BDF8]">{article.publisher}</span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
    </div>
    
  );
}