"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const images = [
  
  "https://www.babahadurgarh.com/gallery/http:%2F%2Fbabahadurgarh.com%2Fadmin%2Fuploads%2F78cfa8419ccaadc92784ac4651bfeca1.jpeg",
  "https://babahadurgarh.com/admin/uploads/c8d4eee57ceaf0707eed40199932f8a7.jpeg",
  "https://babahadurgarh.com/admin/uploads/f7aa25ced20e4b3a18447ed6e48461ea.jpeg",
  "https://babahadurgarh.com/admin/uploads/f7aa25ced20e4b3a18447ed6e48461ea.jpeg",
  "https://babahadurgarh.com/admin/uploads/8f93db0e6c993dc16ffbf54f0c042ee8.jpeg",
  "https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg",
  "https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg",
  "https://www.babahadurgarh.com/gallery/http:%2F%2Fbabahadurgarh.com%2Fadmin%2Fuploads%2F8922a054b76ebb39fe974403f968873f.jpg",
  "https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg",
  "https://babahadurgarh.com/admin/uploads/60d4ed1434bb796688957aa3be48d668.jpeg",
  "https://babahadurgarh.com/admin/uploads/aea4634f281c12e473c942207ae41787.jpeg",
  "https://babahadurgarh.com/admin/uploads/25fa0823273554ecd564c0b3446499fa.jpeg",
  "https://babahadurgarh.com/admin/uploads/aea4634f281c12e473c942207ae41787.jpeg",
  "https://babahadurgarh.com/admin/uploads/25fa0823273554ecd564c0b3446499fa.jpeg",
  "https://babahadurgarh.com/admin/uploads/8f93db0e6c993dc16ffbf54f0c042ee8.jpeg",
]
const positions = [
  { top: "5%", left: "0%" },
  { top: "25%", left: "10%" },
  { top: "5%", left: "20%" },
  { top: "25%", left: "30%" },
  { top: "5%", left: "40%" },
  { top: "25%", left: "50%" },
  { bottom: "5%", left: "0%" },

  { top: "5%", right: "0%" },
  { top: "25%", right: "10%" },
  { top: "5%", right: "20%" },
  { bottom: "5%", right: "0%" },
];

export default function OverlappingImages() {
  const [shuffledImages, setShuffledImages] = useState([]);

  useEffect(() => {
    setShuffledImages(
      images.map((src, index) => ({
        src,
        position: positions[index % positions.length],
        rotation: Math.random() * 30 - 15, // Tilting entire photo
      }))
    );
  }, []);

  return (
    <div className="relative w-full sm:h-screen h-full flex justify-center items-center overflow-x-hidden">
      {/* Centered Text - Appears on top */}
      <div className="absolute bottom-10 left-[50%] transform -translate-x-1/2 text-center w-[32rem] sm:w-[20rem] md:w-[25rem] sm:block hidden text-black z-20">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold uppercase banner-text">
        Glimpses of Justice
        </h1>
        <span className="text-sm sm:text-base font-light mt-8">
        Explore key moments from legal conferences of advocates across India.
        </span>
      </div>

      {/* Overlapping Photos on Large Devices */}
      <div className="hidden sm:block">
        {shuffledImages.map(({ src, position, rotation }, index) => (
          <motion.div
            key={index}
            className="absolute bg-white p-5 shadow-2xl cursor-pointer"
            style={{
              width: "200px",
              height: "200px",
              ...position,
            }}
            initial={{ opacity: 0, scale: 0.9, rotate: rotation }}
            animate={{ opacity: 1, scale: 1, rotate: rotation }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ scale: 1.1, rotate: rotation + 5 }}
          >
            <img src={src} alt={`Image ${index}`} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Horizontal Photos for Mobile and iPad */}
       {/* MOBILE & TABLET VIEW */}
       <div className="sm:hidden px-4 py-10">
        {/* Text on top */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold uppercase text-black">Glimpses of Justice</h1>
          <p className="text-sm mt-2 text-black">Explore key moments from legal conferences of advocates across India.</p>
        </div>

        {/* Scrollable horizontal image row */}
        <div className="flex overflow-x-auto gap-4">
          {shuffledImages.map(({ src }, index) => (
            <motion.div
              key={index}
              className="flex-none w-[200px] h-[200px] bg-white p-2 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <img src={src} alt={`Image ${index}`} className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional Text */}
      <div className="flex flex-col items-center justify-center w-full p-6">
        <h1 className="text-5xl text-black font-extrabold uppercase"></h1>
      </div>
    </div>
  );
}
