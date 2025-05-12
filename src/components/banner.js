"use client"; // Required in Next.js 15 for interactivity
import Link from "next/link"
import { ReactTyped } from "react-typed";
import Image from "next/image"

function Banner(){
  return (
    
    <div className="relative flex flex-col items-center justify-center overflow-hidden bg-white h-screen sm:h-[44rem] w-full bg-gradient-to-r from-black to-transparent pt-20">
      {/* Background div */}
      <div class="absolute inset-0 bg-blue-800 opacity-60"></div>
      <div className="flex flex-row items-center justify-center flex-wrap  h-screen w-full bg-center bg-blue-800/50 cursor-pointer" >

       {/* Content Over div */}
       <div className=" z-10 flex flex-col items-center justify-center h-full text-white text-left sm:text-center">
       <h1 className="text-4xl sm:mt-0 mt-20 sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 text-center w-80 sm:w-[50rem] uppercase">Trusted by Advocates. <br /> Respected by Institutions. <br /> Driven by Justice.</h1>
        <span className="text-xl sm:text-4xl sm:my-8 my-0 mt-4 font-medium text-gray-100 text-left sm:text-center w-80 h-40 sm:h-20 sm:w-[50rem] banner-text">
           <ReactTyped typeSpeed={10} backSpeed={10} loop startDelay={1000} backDelay={5000} className="text-white" strings={[`Peerless performance, efficiency and developer experience. Next.js is trusted by some of the biggest names of the web.` ]} />
         </span>
       
      </div>

      <Image src={"https://img.freepik.com/free-photo/businessmen-closing-deal-with-handshake_1098-3793.jpg?t=st=1744048283~exp=1744051883~hmac=443e71487731c4bdbdd89c88071468b441932f09dbccaaf5c428faaaab503cab&w=1380"} height={300} width={300} className="rounded-xl h-96 w-96 z-[9996] object-cover" objectFit={"contain"} />

       
      </div>
    </div>
    
  );
};

export default Banner;
