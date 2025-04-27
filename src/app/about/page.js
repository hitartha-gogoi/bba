'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"

export default function About() {

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white pt-20 ">

      <Navbar textColor="black" />

      {/* THE SOLUTION WITH IMAGE 1 */}


    <div className={`flex flex-col sm:flex-row w-full  min-h-screen justify-between items-center sm:items-start sm:flex-nowrap flex-wrap py-20 gap-y-16 gap-x-8 border-t border-white`}> 

        <div className="flex flex-col self-start justify-between w-full mt-40 ">
          <h1 className="self-start inline text-3xl md:text-5xl sm:text-6xl text-left ml-6 sm:ml-20 text-black uppercase banner-text font-semibold w-72 sm:w-3/5 break-words "> Accessible <span className='text-blue-500 inline'>Legal</span> Support for All </h1>
        </div>


        <div className="flex flex-col justify-between space-y-12  mt-40 w-80 sm:w-full md:w-4/5 lg:w-3/5 ">

          <div className="relative group w-full max-w-lg h-80 rounded-lg bg-[url('https://img.freepik.com/premium-photo/good-service-cooperation-consultation-businesswoman-male-lawyer-judge-counselor-having-team-meeting-with-client-law-legal-services-concept_265022-84953.jpg?w=740')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
            {/* gradient overlay only */}
                
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
            {/* text container above the gradient */}
              <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                <p className="text-base banner-text font-bold  text-gray-300"> Chip and battery Life </p>
                <p className="text-3xl mt-2 font-bold  text-white banner-text"> Fast that last</p>
              </div>
          </div>

          <p className="flex flex-wrap break-words text-xl max-w-lg min-w-sm sm:text-2xl font-medium mr-0 sm:mr-20 text-black banner-text">Dedicated to providing affordable and transparent legal assistance, ensuring every citizen's right to fair representation.</p>
        </div>
      </div>


      {/* THE SOLUTION WITH IMAGE 2 */}


    <div className={`flex flex-col sm:flex-row w-full  min-h-screen justify-between items-center sm:items-start sm:flex-nowrap flex-wrap py-20 gap-y-16 gap-x-8 border-t border-white`}> 

        <div className="flex flex-col self-start justify-between w-full mt-40 ">
          <h1 className="self-start inline text-3xl md:text-5xl sm:text-6xl text-left ml-6 sm:ml-20 text-gray-600 uppercase banner-text font-semibold w-72 sm:w-3/5 break-words"> Seasoned <span className='text-black'>Advocates</span>  at Your Service </h1>
        </div>


        <div className="flex flex-col justify-between space-y-12  mt-40 w-80 sm:w-full md:w-4/5 lg:w-3/5 ">

          <div className="relative group w-full max-w-lg h-80 rounded-lg bg-[url('https://www.apple.com/v/iphone/home/cb/images/overview/consider/apple_intelligence__gbh77cvflkia_xlarge_2x.jpg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
            {/* gradient overlay only */}
                
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
            {/* text container above the gradient */}
              <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                <p className="text-base banner-text font-bold  text-gray-300"> Chip and battery Life </p>
                <p className="text-3xl mt-2 font-bold  text-white banner-text"> Fast that last</p>
              </div>
          </div>

          <p className="flex flex-wrap break-words text-xl max-w-lg min-w-sm sm:text-2xl font-medium mr-0 sm:mr-20 text-black banner-text">Our team of experienced lawyers specializes in a wide range of legal matters, delivering expert counsel and representation.</p>
        </div>
      </div>


      {/* THE SOLUTION WITH IMAGE 3 */}


    <div className={`flex flex-col sm:flex-row w-full  min-h-screen justify-between items-center sm:items-start sm:flex-nowrap flex-wrap py-20 gap-y-16 gap-x-8 border-t border-white`}> 

        <div className="flex flex-col self-start justify-between w-full mt-40 ">
          <h1 className="self-start inline text-3xl md:text-5xl sm:text-6xl text-left ml-6 sm:ml-20 text-black uppercase banner-text font-semibold w-72 sm:w-3/5 break-words"> Upholding the Rule of Law </h1>
        </div>


        <div className="flex flex-col justify-between space-y-12  mt-40 w-80 sm:w-full md:w-4/5 lg:w-3/5 ">

          <div className="relative group w-full max-w-lg h-80 rounded-lg bg-[url('https://www.apple.com/v/iphone/home/cb/images/overview/consider/apple_intelligence__gbh77cvflkia_xlarge_2x.jpg')] bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
            {/* gradient overlay only */}
                
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
            {/* text container above the gradient */}
              <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                <p className="text-base banner-text font-bold  text-gray-300"> Chip and battery Life </p>
                <p className="text-3xl mt-2 font-bold  text-white banner-text"> Fast that last</p>
              </div>
          </div>

          <p className="flex flex-wrap break-words text-xl max-w-lg min-w-sm sm:text-2xl font-medium mr-0 sm:mr-20 text-black banner-text">With a steadfast commitment to justice, we work tirelessly to protect and enforce the legal rights of our clients.</p>
        </div>
      </div>



      <div>
        
      </div>






      <Footer />
      

    </div>
  );
}
