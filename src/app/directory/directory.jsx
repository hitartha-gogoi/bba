'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Search } from 'lucide-react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Directory({ initialLawyers }) {

  const base_url = "https://bba-backend.onrender.com"

  //SEARCH QUERY STATE
  const [query, setQuery] = useState('');

  // LAWYERS STATE
  const [ lawyers, setLawyers ] = useState(initialLawyers || [])

  // OVERLAY STATES FOR LAWYER POPUP
    const [ overlayLawyerName, setOverlayLawyerName ] = useState('')
    const [ overlayLawyerEmail, setOverlayLawyerEmail ] = useState('')  
    const [ overlayLawyerDescription, setOverlayLawyerDescription ] = useState('')
    const [ overlayLawyerPhoto, setOverlayLawyerPhoto ] = useState('')  
    const [ overlayLawyerPhone, setOverlayLawyerPhone ] = useState('')
    const [ overlay, setOverlay] = useState(false);


    // SEARCH LAWYERS
    const search = async () => {
        try{
            const response = await fetch(`${base_url}/search?username=${query}`, { 
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                console.error('Error fetching users:', response.statusText);
                return;
            }
            
            const data = await response.json();
            console.log('lawyers:', data);
            setLawyers(data.lawyers);
        
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

  
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white pt-20">

      <Navbar textColor="black" />

      {/* OVERLAY FOR LAWYER POPUP */}
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
                    className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
                      {/* close button */}
                      <button style={{ pointerEvents: "auto" }} onClick={() => setOverlay(false)} className="absolute top-4 right-2 text-gray-600 hover:text-gray-800 z-50">
                        <X className="h-6 w-6" />
                      </button>
      
                      {/* large image */}
                      <div className="w-full h-80 relative">
                        <Image
                          src={overlayLawyerPhoto || "https://via.placeholder.com/300"} // default image if no photo is available
                          alt="Lawyer Image"
                          layout="fill"
                          objectFit="cover"
                          className="w-4/5 h-96 object-contain"
                        />
                      </div>
      
                      {/* details */}
                      <div className="p-6 space-y-2">
                        <p className="font-bold text-black text-lg">
                         {overlayLawyerName}
                        </p>
                        <p className="text-gray-700">
                         {overlayLawyerEmail}
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                         {overlayLawyerDescription}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}
        </AnimatePresence>
      
      {/* SEARCH BAR */}
        <div className="relative w-4/5 my-4  flex flex-col items-center justify-center">      
          <input type="text" value={query} onChange={(e) =>{ setQuery(e.target.value); search(); }} placeholder="Search Lawyers" className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
        </div>
        
        {/* SEARCH TABLE FOR USERS */}
        <div className="flex flex-col justify-evenly items-center w-full sm:w-4/5 px-4 ">
         {/* A TABLE COMPONENT */}
        
        {lawyers.map((lawyer, index)=>{
        
            return (
        
                <div key={index} className="flex flex-row justify-evenly items-center p-4  w-full rounded-md z-9999">
                  <div onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlay(true) }}  className="flex flex-row justify-start flex-wrap items-center py-2 w-full sm:w-4/5">
                     {lawyer.photo ? ( <Image height={60} width={60} className="sm:rounded-md rounded-full h-10 w-10" src={lawyer.photo || "https://via.placeholder.com/60"} alt={lawyer.username || "Lawyer Image"} />) : ( <div className="w-[60px] h-[60px] bg-gray-300 rounded-md" />)}
                    <div className="flex flex-col justify-start items-center py-2 ml-4">
                      <span className="text-black self-start font-semibold banner-text ">{lawyer.username}</span>
                      <span className="text-gray-400 self-start font-semibold banner-text ">{lawyer.email}</span>
                    </div>
                  </div>
                  <button onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlay(true) }} className="text-gray-700 text-sm hidden sm:block bg-gray-100 font-normal banner-text uppercase w-48 py-2 rounded-md text-center">view details</button>
                </div> 
                )
        })}
        
        </div>

        <Footer />
      

    </div>
  );
}

