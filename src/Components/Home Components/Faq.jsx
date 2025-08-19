import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

const faqs = [
  {
    question: "How do I become a premium member?",
    answer:
      "Click the 'Subscribe' button in the Plans section or Go the Subscription page, complete the payment, and enjoy unlimited posting and premium content!",
  },
  {
    question: "Can normal users post more than one article?",
    answer:
      "No, normal users can only post one article. Upgrade to premium for unlimited posting.",
  },
  {
    question: "How are articles approved?",
    answer:
      "All articles are reviewed by an admin. Once approved, they appear on the site.",
  },
  {
    question: "What is a premium article?",
    answer:
      "Premium articles are exclusive content available only to premium users. They often include in-depth guides, interviews, or trending tech news.",
  },
//   {
//     question: "How do I join the community?",
//     answer:
//       "Register for a free account, start posting, commenting, and connect with other developers in the Top Contributors section.",
//   },
  {
    question: "How do I update my profile?",
    answer:
      "Go to your profile page by clicking your avatar in the navbar, then click 'Edit Profile' to update your name or photo.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes! We use Firebase Auth, secure JWT, and encrypted database storage to keep your data safe.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="bg-[#D0E7F9]/30 cabin dark:bg-[#0F172A] border-t border-[#38BDF8]/20">
        <section className="max-w-5xl mx-auto py-16 px-4 ">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-[#0F172A] dark:text-[#D0E7F9]">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="rounded-xl bg-white/80 dark:bg-[#223A5E]/80 backdrop-blur-lg border border-[#38BDF8]/20 shadow-lg"
          >
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left focus:outline-none"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <span className="font-semibold text-[#0F172A] dark:text-[#38BDF8] text-base">
                {faq.question}
              </span>
              <FaChevronDown
                className={`transition-transform duration-300 text-[#38BDF8] ${openIdx === idx ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-[#475569] dark:text-[#CBD5E1] text-sm"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
    </div>
  );
}