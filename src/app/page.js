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

      {/* STATS */}
      <div className="text-white w-full py-20 flex flex-row justify-center items-center flex-wrap space-x-0 sm:space-x-36 sm:space-y-0 space-y-28  bg-blue-900">
            
            <div className="flex flex-col items-center justify-center flex-wrap space-y-2 w-80 sm:w-1/5">
                <span className=" text-5xl font-bold"><CountUp delay={0} end={10} /></span>
                <span className="text-3xl font-bold uppercase">Years </span>
                <span className="text-xl font-normal sm:font-medium">of service</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 w-80 sm:w-1/5">
                <span className="text-5xl  font-bold"># 1</span>
                <span className="text-3xl font-bold uppercase">India's </span>
                <span className="text-xl font-normal sm:font-medium">top law firm</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-2 mx-4 w-80 sm:w-1/5">
                <span className="text-5xl font-bold w-28"><CountUp delay={0} duration={10} end={130000} /></span>
                <span className="text-3xl font-bold uppercase">cases </span>
                <span className="text-xl font-normal sm:font-medium">handled</span>
            </div>
        </div>


        <h1 className="text-4xl mt-14 text-center font-extrabold uppercase text-black"> meet the executives</h1>

        <div className="w-full h-screen overflow-x-auto overflow-y-hidden bg-white py-10">

        <div className="inline-flex w-max h-screen flex-nowrap space-x-14 pl-4 pr-0 pt-10">
                {/* CARD 1 */}
                
                <div className="relative group w-96 h-4/5 rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/b8079b0e45a773112ceb7f67c124720e.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> vijendar rathi </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> president</p>
                   </div>
                </div>
        
                {/* CARD 2 */}
                <div className="relative group w-96 h-4/5 rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/60d4ed1434bb796688957aa3be48d668.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> Chand Joon </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> vice president</p>
                   </div>
                </div>
        
                {/* CARD 3 */}
                <div className="relative group w-96 h-4/5 rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/aea4634f281c12e473c942207ae41787.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> rajdeep singh </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> secretary</p>
                   </div>
                </div>
        
                {/* CARD 4 */}
                <div className="relative group w-96 h-4/5 rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/25fa0823273554ecd564c0b3446499fa.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}
                
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300">Taruna Rani </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> Joint - Secretary</p>
                   </div>
                </div>
        
                {/* CARD 5 */}
                <div className="relative group w-96 h-4/5 rounded-lg bg-[url('https://babahadurgarh.com/admin/uploads/8f93db0e6c993dc16ffbf54f0c042ee8.jpeg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
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

            <Carousel />


            {/* WHY CHOOSE US? */}

            <h1 className="text-center text-5xl text-black font-bold banner-text uppercase mt-10 sm:mt-40">why choose us?</h1>

            <div className="flex flex-row justify-center items-center space-x-0 space-y-16 sm:space-x-20 flex-wrap w-full  my-24">

      
            <div className="group relative flex flex-col justify-center items-center w-96 h-96 border cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
              {/* Black Overlay */}
              <div className="absolute inset-0 hover:bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
              {/* Inner Service Card */}
              <div className="relative z-10 p-6 text-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-lg group-hover:text-green-400 transition-colors duration-300" /> Legal Services </h3>
               <div className="bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 my-8">
                <div className="flex items-center gap-3 mb-2 text-gray-800 group-hover:text-white">
                  <FaGavel className="text-xl" />
                  <h4 className="text-lg font-semibold">Criminal & Civil Cases</h4>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-gray-200">We offer expert representation in criminal defense, civil litigation, and property disputes.</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 group-hover:text-gray-300">
                <FaHandshake className="text-base" />
                Trusted by over 500+ clients across Haryana
                </div>
              </div>
              </div>


              <div className="group relative flex flex-col justify-center items-center w-96 h-96 border cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
              {/* Black Overlay */}
              <div className="absolute inset-0 hover:bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
              {/* Inner Service Card */}
              <div className="relative z-10 p-6 text-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-lg group-hover:text-green-400 transition-colors duration-300" /> Legal Services </h3>
               <div className="bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 my-8">
                <div className="flex items-center gap-3 mb-2 text-gray-800 group-hover:text-white">
                  <FaGavel className="text-xl" />
                  <h4 className="text-lg font-semibold">Criminal & Civil Cases</h4>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-gray-200">We offer expert representation in criminal defense, civil litigation, and property disputes.</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 group-hover:text-gray-300">
                <FaHandshake className="text-base" />
                Trusted by over 500+ clients across Haryana
                </div>
              </div>
              </div>

              <div className="group relative flex flex-col justify-center items-center w-96 h-96 border cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
              {/* Black Overlay */}
              <div className="absolute inset-0 hover:bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
              {/* Inner Service Card */}
              <div className="relative z-10 p-6 text-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-lg group-hover:text-green-400 transition-colors duration-300" /> Legal Services </h3>
               <div className="bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 my-8">
                <div className="flex items-center gap-3 mb-2 text-gray-800 group-hover:text-white">
                  <FaGavel className="text-xl" />
                  <h4 className="text-lg font-semibold">Criminal & Civil Cases</h4>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-gray-200">We offer expert representation in criminal defense, civil litigation, and property disputes.</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 group-hover:text-gray-300">
                <FaHandshake className="text-base" />
                Trusted by over 500+ clients across Haryana
                </div>
              </div>
              </div>

              <div className="group relative flex flex-col justify-center items-center w-96 h-96 border cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
              {/* Black Overlay */}
              <div className="absolute inset-0 hover:bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
              {/* Inner Service Card */}
              <div className="relative z-10 p-6 text-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-lg group-hover:text-green-400 transition-colors duration-300" /> Legal Services </h3>
               <div className="bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 my-8">
                <div className="flex items-center gap-3 mb-2 text-gray-800 group-hover:text-white">
                  <FaGavel className="text-xl" />
                  <h4 className="text-lg font-semibold">Criminal & Civil Cases</h4>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-gray-200">We offer expert representation in criminal defense, civil litigation, and property disputes.</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 group-hover:text-gray-300">
                <FaHandshake className="text-base" />
                Trusted by over 500+ clients across Haryana
                </div>
              </div>
              </div>

              <div className="group relative flex flex-col justify-center items-center w-96 h-96 border cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
              {/* Black Overlay */}
              <div className="absolute inset-0 hover:bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
              {/* Inner Service Card */}
              <div className="relative z-10 p-6 text-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-lg group-hover:text-green-400 transition-colors duration-300" /> Legal Services </h3>
               <div className="bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 my-8">
                <div className="flex items-center gap-3 mb-2 text-gray-800 group-hover:text-white">
                  <FaGavel className="text-xl" />
                  <h4 className="text-lg font-semibold">Criminal & Civil Cases</h4>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-gray-200">We offer expert representation in criminal defense, civil litigation, and property disputes.</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 group-hover:text-gray-300">
                <FaHandshake className="text-base" />
                Trusted by over 500+ clients across Haryana
                </div>
              </div>
              </div>

              <div className="group relative flex flex-col justify-center items-center w-96 h-96 border cursor-pointer shadow-xl rounded-lg hover:bg-blue-800 transition-all duration-500 ease-in-out transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
              {/* Black Overlay */}
              <div className="absolute inset-0 hover:bg-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
              {/* Inner Service Card */}
              <div className="relative z-10 p-6 text-black group-hover:text-white transition-colors duration-500">
              <h3 className="text-2xl font-semibold flex items-center gap-2">
              <FaBalanceScale className="text-lg group-hover:text-green-400 transition-colors duration-300" /> Legal Services </h3>
               <div className="bg-white/90 group-hover:bg-black/20 border border-gray-200 group-hover:border-gray-600 rounded-lg p-4 transition-all duration-500 my-8">
                <div className="flex items-center gap-3 mb-2 text-gray-800 group-hover:text-white">
                  <FaGavel className="text-xl" />
                  <h4 className="text-lg font-semibold">Criminal & Civil Cases</h4>
                </div>
                <p className="text-sm text-gray-600 group-hover:text-gray-200">We offer expert representation in criminal defense, civil litigation, and property disputes.</p>
              </div>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-700 group-hover:text-gray-300">
                <FaHandshake className="text-base" />
                Trusted by over 500+ clients across Haryana
                </div>
              </div>
              </div>

            </div>


            <h1 className="text-center text-5xl text-black font-bold banner-text uppercase mt-10 sm:mt-40">Don't just take our words</h1>
            <div className="flex items-center gap-2 mt-2 text-lg text-gray-700 group-hover:text-gray-300">
               Here's what others have said about us
            </div>

            {/* TWEETS */}
      <div className="flex flex-col flex-wrap justify-center items-center w-full h-screen ">
        <Tweets />
      </div>


      {/* THE PROBLEM */}
      
          <div className={`flex flex-col w-full  h-screen justify-start items-center mt-24 border-t-2 border-blue-700`}> 
      
              <div className="flex flex-col justify-between space-y-24 w-full mt-40 ">
                  <h1 className="text-4xl sm:text-6xl text-left ml-6 sm:ml-20 text-black uppercase banner-text font-bold "> the problem ?</h1>
                  <p className="text-2xl sm:text-4xl text-left self-end mr-0 sm:mr-20 text-black uppercase montserrat-light w-80 sm:w-96">In today's era of AI and ML, brushing up skills have really become difficult</p>
              </div>
      
          </div>
      
          {/* THE SOLUTION */}
      
      
          <div className={`flex flex-col w-full h-screen justify-start items-center border-t-2 border-blue-700`}> 
      
              <div className="flex flex-col justify-between space-y-12 w-full mt-40 ">
                  <h1 className="text-4xl sm:text-6xl text-left ml-6 sm:ml-20 text-black uppercase banner-text font-bold"> the solution </h1>
                  <p className="text-2xl sm:text-4xl text-left self-end mr-0 sm:mr-20 text-black uppercase montserrat-light w-80 sm:w-96">In today's era of AI and ML, brushing up skills have really become difficult</p>
              </div>
      
          </div>


      <div className="relative bg-gradient-to-b from-blue-900 to-black h-screen w-full py-20 overflow-hidden">
      
      {/* Scrolling Row */}
      <div className="scroll-container">
        <div className="scroll-content">
          {/* Cards (Manually Inserted) */}
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/ba7ab5ef3af20e247f595aa741283ed5.jpeg')]"></div>
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/3dbf5a0d625c25ca0332f8be8e7743e4.jpeg')]"></div>
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg')]"></div>
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/0e94cae23079e600b375339fec9ae5a4.jpeg')]"></div>
        </div>

        {/* Duplicate Content to Ensure Seamless Loop */}
        <div className="scroll-content">
        <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/ba7ab5ef3af20e247f595aa741283ed5.jpeg')]"></div>
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/3dbf5a0d625c25ca0332f8be8e7743e4.jpeg')]"></div>
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/318e41bc02f71c5294ceed19f630095c.jpeg')]"></div>
          <div className="scroll-item bg-[url('https://babahadurgarh.com/admin/uploads/0e94cae23079e600b375339fec9ae5a4.jpeg')]"></div>
        </div>
      </div>

      
    </div>


      <Footer />
      
    </div>
  );
}
