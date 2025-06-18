"use client"
import Image from "next/image";
import Navbar from "@/components/navbar";
import Banner from "@/components/banner"
import Footer from "@/components/footer"
import CountUp from 'react-countup';
import Tweets from "@/components/tweets";
import  Carousel from "@/components/carousel";
import { FaBalanceScale, FaGavel, FaHandshake } from 'react-icons/fa'
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBaseURL } from "@/context/context";


export default function Home() {

  const [committee, setCommittee] = useState([]);
  const base_url = useBaseURL(); // Change this to your backend URL if needed

  useEffect(() => {
    const fetchCommittee = async () => {
      const res = await fetch(`${base_url}/executive-committee`, { cache: "no-store" });
      const json = await res.json();
      setCommittee(json || []);
    };

    fetchCommittee();
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white">

      <Navbar textColor={'black'} />

      <Banner  />

        <h1 className="text-4xl mt-14 text-center font-extrabold uppercase text-black"> meet the executives</h1>

        {/* EXECUTIVE COMMITTEE */}
        <div className="w-full h-screen sm:h-[40rem] overflow-x-auto overflow-y-hidden bg-white py-10">
        <div className="inline-flex w-max h-screen flex-nowrap space-x-14 pl-4 pr-0 pt-10">
            {committee.map(({ _id, title, name, link }) => (
              <div style={{ backgroundImage: `url(${link})` }} className="relative group w-96 h-[26rem] sm:h-[30rem] rounded-lg bg-cover bg-center cursor-pointer shadow-md  transition-transform duration-300 transform  hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
                {/* gradient overlay only */}    
                  <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 z-10"></div>
                  {/* text container above the gradient */}
                    <div className="absolute inset-0 flex flex-col items-start pt-6 pl-4 z-20">
                      <p className="text-base banner-text font-bold  text-gray-300"> {name} </p>
                       <p className="text-3xl mt-2 font-bold  text-white banner-text"> {title}</p>
                   </div>
              </div>
            ))}
        </div>
        </div>

        {/* Scrolling Row */}
        <div className="relative bg-gradient-to-b from-blue-900 to-black w-full py-20 overflow-hidden h-screen sm:h-[40rem]">
      
          <div className="scroll-container h-screen sm:h-[40rem]">
        <div className="scroll-content  h-screen sm:h-[40rem]">
          {/* Cards (Manually Inserted) */}
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-1.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-2.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-3.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-complex.jpeg')]"></div>
        </div>

        {/* Duplicate Content to Ensure Seamless Loop */}
        <div className="scroll-content">
        <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-1.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-2.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-3.jpeg')]"></div>
          <div className="scroll-item h-[26rem] sm:h-[30rem] bg-[url('https://babahadurgarh.com/bahadurgarh-image-complex.jpeg')]"></div>
        </div>
          </div>
        </div>

      <Footer />
      
    </div>
  );
}
