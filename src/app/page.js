"use client"
import Image from "next/image";
import Navbar from "@/components/navbar";
import Banner from "@/components/banner"
import Footer from "@/components/footer"
import CountUp from 'react-countup';
import Tweets from "@/components/tweets";
import  Carousel from "@/components/carousel";
import { FaBalanceScale, FaGavel, FaHandshake } from 'react-icons/fa'

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white">

      <Navbar textColor={'black'} />

      <Banner  />

        <h1 className="text-4xl mt-14 text-center font-extrabold uppercase text-black"> meet the executives</h1>

        <div className="w-full h-screen sm:h-[40rem] overflow-x-auto overflow-y-hidden bg-white py-10">

        <div className="inline-flex w-max h-screen flex-nowrap space-x-14 pl-4 pr-0 pt-10">
                {/* CARD 1 */}
                
                <div className="relative group w-96 h-[26rem] sm:h-[30rem] rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/b8079b0e45a773112ceb7f67c124720e.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> vijendar rathi </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> president</p>
                   </div>
                </div>
        
                {/* CARD 2 */}
                <div className="relative group w-96 h-[26rem] sm:h-[30rem] rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/60d4ed1434bb796688957aa3be48d668.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> Chand Joon </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> vice president</p>
                   </div>
                </div>
        
                {/* CARD 3 */}
                <div className="relative group w-96 h-[26rem] sm:h-[30rem] rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/aea4634f281c12e473c942207ae41787.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> rajdeep singh </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> secretary</p>
                   </div>
                </div>
        
                {/* CARD 4 */}
                <div className="relative group w-96 h-[26rem] sm:h-[30rem] rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/25fa0823273554ecd564c0b3446499fa.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300">Taruna Rani </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> Joint - Secretary</p>
                   </div>
                </div>
        
                {/* CARD 5 */}
                <div className="relative group w-96 h-[26rem] sm:h-[30rem] rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/8f93db0e6c993dc16ffbf54f0c042ee8.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> Mohit Kumar </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> Treasurer Cum Librarian</p>
                   </div>
                </div>
      
        
              </div>
            </div>

      <div className="relative bg-gradient-to-b from-blue-900 to-black w-full py-20 overflow-hidden h-screen sm:h-[40rem]">
      
      {/* Scrolling Row */}
      <div className="scroll-container h-screen sm:h-[40rem]">
        <div className="scroll-content  h-screen sm:h-[40rem]">
          {/* Cards (Manually Inserted) */}
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/ba7ab5ef3af20e247f595aa741283ed5.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/3dbf5a0d625c25ca0332f8be8e7743e4.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/0e94cae23079e600b375339fec9ae5a4.jpeg')]"></div>
        </div>

        {/* Duplicate Content to Ensure Seamless Loop */}
        <div className="scroll-content">
        <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/ba7ab5ef3af20e247f595aa741283ed5.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/3dbf5a0d625c25ca0332f8be8e7743e4.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/admin/uploads/0e94cae23079e600b375339fec9ae5a4.jpeg')]"></div>
        </div>
      </div>

      
    </div>


      <Footer />
      
    </div>
  );
}
