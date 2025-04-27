"use client"; // Required in Next.js 15 for interactivity
import Link from "next/link"
import { FiDownload } from "react-icons/fi";
import { IoCodeSlashSharp } from "react-icons/io5";
import { AiTwotoneCheckCircle, AiFillInstagram, AiFillTwitterSquare,  AiFillLinkedin, AiFillGithub } from "react-icons/ai"
import { ReactTyped } from "react-typed";

function Banner(){
  return (
    
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-white h-screen w-full bg-gradient-to-r from-black to-transparent pt-20">
      {/* Background div */}
      <div class="absolute inset-0 bg-blue-800 opacity-60"></div>
      <div  className="bg-[url('https://img.freepik.com/free-photo/businessmen-closing-deal-with-handshake_1098-3793.jpg?t=st=1744048283~exp=1744051883~hmac=443e71487731c4bdbdd89c88071468b441932f09dbccaaf5c428faaaab503cab&w=1380')] bg-cover h-screen w-full bg-center bg-blue-800/50 cursor-pointer" >

       {/* Content Over div */}
       <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-left sm:text-center">
       <h1 className="text-4xl sm:mt-0 mt-20 sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center w-80 sm:w-[50rem] uppercase">Trusted by Advocates. <br /> Respected by Institutions. <br /> Driven by Justice.</h1>
        <span className="text-xl sm:text-4xl sm:my-8 my-0 mt-4 font-medium text-gray-400 text-left sm:text-center w-80 h-40 sm:h-20 sm:w-[50rem] banner-text">
            <ReactTyped typeSpeed={10} backSpeed={10} loop startDelay={1000} backDelay={5000} className="text-white" strings={[`Peerless performance, efficiency and developer experience. Next.js is trusted by some of the biggest names of the web.` ]} />
         </span>

        <div className="flex flex-row justify-center w-full items-center  mb-16 sm:mb-0 my-0 sm:my-8">
        <button  className="flex uppercase text-center p-4 mx-4 font-bold text-black bg-white hover:border-blue-900 border-x-4 border-y-4  hover:scale-105 hover:shadow-xl hover:shadow-neutral-700 transition-transform duration-200 ease-in-out">
            view members
          </button>
          <button className="flex text-center uppercase p-4 mx-4 font-bold text-black bg-white hover:border-blue-900 border-x-4 border-y-4 hover:scale-105 hover:shadow-xl hover:shadow-neutral-700 transition-transform duration-200 ease-in-out">
          events
          </button>
        </div>
       
      </div>

       
      </div>
    </div>
    
  );
};

export default Banner;
