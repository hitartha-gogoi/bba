"use client"; // Required in Next.js 15 for interactivity
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./sidebar";
import { FaDiscord, FaYoutube, FaGithubSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter, FaMedium } from "react-icons/fa6";
import { FaBars } from "react-icons/fa";

function Navbar({ textColor }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };


  const moreItems = [
    { name: "Judgements and Orders", href: "https://judgments.ecourts.gov.in/pdfsearch/?p=pdf_search/index&escr_flag=Y" },
    { name: "sitting judges", href: "https://jhajjar.dcourts.gov.in/list-of-judges/" },
    { name: "voterlist", href: "/voterlist.pdf" },
    { name: "download forms", href: "/download-form.pdf" },
  ];

  const closeAllPopups = () => {
    setMoreOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".popup-menu")) {
        closeAllPopups();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="z-[9998] w-full h-20 flex flex-row justify-between fixed top-0 left-0 bg-white">
      <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      {/* Logo */}
      <Link href="/">
        <Image
          src="https://www.azuki.com/Azuki%20Logo%20White.svg"
          alt="logo"
          width={80}
          height={80}
          className="mr-2 p-2 m-4 rounded-md bg-red-600 hover:scale-105 transition-transform duration-200 ease-in-out"
        />
      </Link>

      {/* Nav Links */}
      <div className={`flex flex-row justify-center items-center sm:px-10 px-2 text-base uppercase text-${textColor}`}>
        <Link href="/calendar"><span className="hidden sm:block font-bold hover:shadow-xl mx-4 banner-text">calendar</span></Link>
        <Link href="/gallery"><span className="hidden sm:block font-bold hover:shadow-xl mx-4 banner-text">gallery</span></Link>
        <Link href="/directory"><span className="hidden sm:block font-bold hover:shadow-xl mx-4 banner-text">directory</span></Link>
        
        <span
          className="hidden sm:block font-bold hover:shadow-xl mx-4 banner-text cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setMoreOpen(!moreOpen);
          }}
        >
          more
        </span>

        

        <Link href="/contact"><span className="hidden sm:block font-bold hover:shadow-xl mx-4 banner-text">contact</span></Link>
        <Link href="/pay-fee"><span className="hidden sm:block font-bold hover:shadow-xl mx-4 banner-text">pay fee</span></Link>
      </div>

      {/* Sidebar Toggle */}
      <FaBars onClick={toggleSidebar} className="m-6 hover:scale-125 transition-transform duration-200 ease-in-out cursor-pointer" color="black" />

  
      {/* More Popup */}
      <AnimatePresence>
        {moreOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="popup-menu absolute left-[46%] -translate-x-1/2 top-full bg-white p-3 rounded-lg shadow-lg flex flex-col w-72"
            style={{ marginTop: "8px", paddingTop: "8px" }}
          >
            <span className="flex items-center text-xs text-neutral-900 p-4 h-4 border-b-2 border-gray-200">MORE STUFF</span>
            {moreItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center gap-4 p-4 border-b-2 border-gray-200 text-black hover:text-white hover:bg-black"
              >
                <span className="font-extrabold uppercase">{item.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
