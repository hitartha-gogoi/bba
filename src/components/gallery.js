"use client"; 

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const sampleImages = [
  "https://babahadurgarh.com/admin/uploads/c8d4eee57ceaf0707eed40199932f8a7.jpeg",
  "https://babahadurgarh.com/admin/uploads/f7aa25ced20e4b3a18447ed6e48461ea.jpeg",
  "https://babahadurgarh.com/admin/uploads/f7aa25ced20e4b3a18447ed6e48461ea.jpeg",
  "https://babahadurgarh.com/admin/uploads/8f93db0e6c993dc16ffbf54f0c042ee8.jpeg",
  "https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg",
  "https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg",
  "https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg",
  "https://babahadurgarh.com/admin/uploads/60d4ed1434bb796688957aa3be48d668.jpeg",
];

const Gallery = ({ title, category, items }) => {

  useEffect(()=>{
    const filteredItems = items.filter(item => item.category === category);
    console.log(filteredItems, items)
  },[])

  const [overlay, setOverlay] = useState(false);
  const [ overlayGalleryPhoto, setOverlayGalleryPhoto ] = useState('')  

  const filteredItems = items.filter(item => item.category === category);

  return (
    <div className="w-full py-6 px-4">

      {/* Overlay with Framer Motion */}
             <AnimatePresence>
              {overlay && (
                <>
                  {/* backdrop */}
                  <motion.div
                    className="fixed inset-0 bg-black/60 z-40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setOverlay(false)}
                  />
      
                  {/* content card */}
                  <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
                      {/* close button */}
                      <button style={{ pointerEvents: "auto" }} onClick={() => setOverlay(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-50">
                        X
                      </button>
      
                      {/* large image */}
                      <div className="w-full h-80 relative">
                        <Image
                          src={overlayGalleryPhoto || "https://via.placeholder.com/300" } // default image if no photo is available
                          alt="Gallery Image"
                          layout="fill"
                          objectFit="contain"
                          className="w-4/5 h-96 object-contain"
                        />
                      </div>
      
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            
      <div className="flex justify-between w-full items-center mb-4">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 banner-text">{title}</h2>
      {/* arrow right chevron double in react-icons library */}
      <ChevronsRight className="text-gray-500 w-6 h-6" />
      
        
      </div>

      <div className="flex overflow-x-auto no-scrollbar space-x-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] h-[160px] sm:h-[200px] md:h-[260px] bg-gray-900 rounded-xl overflow-hidden shadow-md flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          >
            {item.type == "photo" ? 
            <Image
              src={item.link || "https://via.placeholder.com/300"}
              onClick={()=> {  setOverlayGalleryPhoto(item.link); setOverlay(true); }}
              alt={`Gallery Item ${index + 1}`}
              width={240}
              height={260}
              className="object-cover w-full h-full"
            /> : <div />
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
