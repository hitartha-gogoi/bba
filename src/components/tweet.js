"use client"; // Required in Next.js 15 for interactivity
import Link from "next/link"
import Image from "next/image";
import { IoCodeSlashSharp } from "react-icons/io5";
import { AiTwotoneCheckCircle, AiFillInstagram, AiFillTwitterSquare,  AiFillLinkedin, AiFillGithub } from "react-icons/ai"
import { FaXTwitter } from "react-icons/fa6";

function Tweet(){
  return (      
      <div className="group relative bg-cover bg-center mr-5 cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-center items-center bg-white w-96 border border-neutral-600 p-6 mx-4">

        <div className="flex flex-row justify-between items-center w-full bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 ">
            <div className="flex flex-row w-4/5 justify-center items-center ">
            <Image src={"https://www.azuki.com/_next/image?url=%2Fhomepage%2FCarousel%2Fbrown-x-beanz-winter.jpg&w=600&q=75"} alt="photo" height={40} width={40} className="rounded-full mr-4 border border-neutral-100" />
                <div className="flex flex-col justify-center w-4/5">
                  <span className="text-black group-hover:text-gray-200 text-lg text-left font-medium">vijendar rathi</span>
                  <span className="text-gray-800 banner-text group-hover:text-gray-200 text-lg text-left font-medium">@vijendarrathi</span>
                </div>
            </div>
            <FaXTwitter />
        </div>

        {/* CONTENT */}
        <p className="banner-text group-hover:text-gray-200 text-left text-neutral-900 font-medium block w-80 break-words whitespace-pre-wrap my-4">The Baba Hadurgarh Bar Association platform has completely transformed the way we manage our legal operations. From seamless access to case records to transparent communication between members and clients, it’s truly a modern solution for traditional law practice. The interface is clean, secure, and incredibly user-friendly. I’ve never felt more connected and supported as a practicing lawyer.</p>
      </div>
    
  );
};

export default Tweet;
