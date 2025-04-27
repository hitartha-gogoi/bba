"use client"; // Required in Next.js 15 for interactivity
import { motion } from "framer-motion";
import Link from "next/link"
import { Typography } from '@mui/material';
import { FcAbout } from "react-icons/fc"
import { SiFiverr } from "react-icons/si"
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks"
import { AiOutlineInfoCircle } from "react-icons/ai"

function Sidebar ({ isVisible, toggleSidebar }){
  return (
    <motion.div
      initial={{ x: "100%" }}  // Sidebar starts from right (100% to the right)
      animate={{ x: isVisible ? 0 : "100%" }}  // Sidebar moves to the left (0 when visible)
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-5 z-40"
    >
    
    <div className="flex flex-col justify-start items-center flex-wrap fixed bg-white h-screen w-52 z-[1500] text-black text-md text-sm font-bold py-20 space-y-2">
    

    <Link href="/admin">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> admin panel </Typography>
    </div>
    </Link>

    <Link href="/about">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> about </Typography>
    </div>
    </Link>

    <Link href="/events">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> events </Typography>
    </div>
    </Link>

    <Link href="/directory">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> directory </Typography>
    </div>
    </Link>

    <Link href="/gallery">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> gallery </Typography>
    </div>
    </Link>

    <Link href="/contact">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> contact </Typography>
    </div>
    </Link>

    <Link href="/calendar">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> calendar </Typography>
    </div>
    </Link>

    <Link href="/payment">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> pay fee </Typography>
    </div>
    </Link>

    <Link href="/">
    <div className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 text-black hover:text-blue-900 hover:border-blue-900">
    <span className="inline h-4 w-4">  </span>
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text uppercase"> judgements </Typography>
    </div>
    </Link>

    
    <div onClick={toggleSidebar} className="flex justify-evenly items-center py-2 w-48 border-y-2 border-gray-800 hover:text-blue-900 hover:border-blue-900">
    <LibraryBooksIcon className="inline h-4 w-4" />
    <Typography variant="subtitle6" className="relative right-6 font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text"> CLOSE </Typography>
    </div>
    
    
    </div>
    </motion.div>
  );
};

export default Sidebar;
