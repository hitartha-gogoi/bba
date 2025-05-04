"use client";

import { motion } from "framer-motion";

const images = [
  "https://img.freepik.com/free-photo/businessman-sitting-desk_1098-18234.jpg",
  "https://img.freepik.com/free-photo/lawyer-gavel_1098-15750.jpg",
  "https://img.freepik.com/free-photo/justice-law-concept_53876-167649.jpg",
  "https://img.freepik.com/free-photo/justice-concept_53876-168109.jpg",
  "https://img.freepik.com/free-photo/smart-lawyer-working_1098-18453.jpg",
  "https://img.freepik.com/free-photo/african-american-female-lawyer_1157-46944.jpg",
  "https://img.freepik.com/free-photo/lawyer-consultation_1098-17988.jpg",
  "https://img.freepik.com/free-photo/legal-consultation-concept_53876-166092.jpg",
];

export default function Collage() {
  return (
    <div className="w-full bg-white py-12 sm:ml-40 px-10">
      {/* Header */}

      {/* Mobile View (Vertical Layout) */}
      <div className="flex flex-col md:hidden space-y-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg bg-white transition-transform duration-300 ease-in-out"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <img
              src={src}
              alt={`Mobile Image ${index}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Desktop View (Creative Grid) */}
      <div className="hidden md:grid grid-cols-12 gap-4 auto-rows-[220px] mt-10">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="rounded-xl overflow-hidden shadow-xl bg-white"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{
              gridColumn: `span ${index % 3 === 0 ? 4 : 3}`,
              gridRow: `span ${index % 2 === 0 ? 2 : 1}`,
            }}
          >
            <img
              src={src}
              alt={`Grid Image ${index}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
