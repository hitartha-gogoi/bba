"use client"; // Required in Next.js 15 for interactivity
import { useState, useEffect, useRef } from "react"
import Image from "next/image";
import Link from 'next/link';
import { motion } from 'framer-motion';
import Sidebar from "./sidebar";
import { FaDiscord } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaMedium } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

function Navbar({ textColor }){

  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [hoveredMore, setHoveredMore] = useState(false);

  const [hovered, setHovered] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const socials = [
    { name: 'Instagram', icon: <AiFillInstagram className="text-black group-hover:text-white transition" size={20} />, link: 'https://discord.com' },
    { name: 'YouTube', icon: <FaYoutube size={20} className="text-black group-hover:text-white transition"  />, link: 'https://discord.com' },
    { name: 'GitHub', icon: <FaGithubSquare size={20} className="text-black group-hover:text-white transition"  />, link: 'https://discord.com' },
    { name: 'X', icon: <FaXTwitter size={20} className="text-black group-hover:text-white transition" />, link: 'https://discord.com' },
    { name: 'Medium', icon: <FaMedium size={20} className="text-black group-hover:text-white transition" />, link: 'https://discord.com' },
    { name: 'Discord', icon: <FaDiscord size={20} className="text-black group-hover:text-white transition"  />, link: 'https://discord.com' },
  ];

  return (
    <div className="z-[9999] w-full h-20 flex flex-row justify-between fixed top-0 left-0 bg-white">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />
      {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 top-full bg-white p-3 rounded-lg shadow-lg flex flex-col w-72"
            style={{ marginTop: '-4px', paddingTop: '8px' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <span className="flex items-center text-xs text-neutral-900 p-4 h-4 border-b-2 border-gray-200">AZUKI</span>
            {socials.map((social) => (
              <Link
                key={social.name}
                href={social.link}
                target="_blank"
                className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black"
              >
                {social.icon} <span className="font-extrabold uppercase">{social.name}</span>
              </Link>
            ))}
          </motion.div>
        )}

        {hoveredMore && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
           className="absolute left-[46%] -translate-x-1/2  top-full bg-white p-3 rounded-lg shadow-lg flex flex-col w-72"
           style={{ marginTop: '8px', paddingTop: '8px' }}
           onMouseEnter={() => setHoveredMore(true)}
           onMouseLeave={() => setHoveredMore(false)}
        >
        <span className="flex items-center text-xs text-neutral-900 p-4 h-4 border-b-2 border-gray-200">MORE STUFF</span>
        <Link href="/" className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black">
          <span className="font-extrabold uppercase">calender</span>
        </Link>
        <Link href="/" className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black">
          <span className="font-extrabold uppercase">judgements and orders</span>
        </Link>
        <Link href="/" className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black">
          <span className="font-extrabold uppercase">upcoming events</span>
        </Link>
        <Link href="/" className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black">
          <span className="font-extrabold uppercase">notices</span>
        </Link>
        <Link href="/" className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black">
          <span className="font-extrabold uppercase">news</span>
        </Link>
        <Link href="/" className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black">
          <span className="font-extrabold uppercase">pay fee</span>
        </Link>
      </motion.div>
      )}



         <Link href="/"> 
          <Image
            src="https://www.azuki.com/Azuki%20Logo%20White.svg"
            alt="logo"
            width={80}  // Adjust size
            height={80} // Adjust size
            className="mr-2 p-2 m-4 rounded-md bg-red-600 hover:scale-105 transition-transform duration-200 ease-in-out"
          />
          </Link>

        {/* BETWEEN LINKS */}
        <div className={`flex flex-row justify-center items-center sm:px-10 px-2 text-base uppercase text-${textColor}`}>
          <Link href="/about"><span className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text">about</span></Link>
          <Link href="/events"><span className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text">events</span></Link>
          <Link href="/gallery"><span className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text">gallery</span></Link>
          <Link href="/directory"><span className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text">directory</span></Link>
          <span onMouseEnter={() => setHoveredMore(true)} onMouseLeave={() => setHoveredMore(false)} className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 py-12 banner-text">more</span>
          <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 py-12 text-center banner-text">socials</span>
          <span className="hidden sm:block font-bold hover:shadow-xl transition-transform duration-200 ease-in-out mx-4 banner-text">contact</span>
        </div>

        <FaBars onClick={()=> setSidebarVisible(true)} className="m-6 hover:scale-125 transition-transform duration-200 ease-in-out" color='black' />
      </div>

    
  );
};

export default Navbar;
