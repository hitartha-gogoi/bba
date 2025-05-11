"use client"; // Required in Next.js 15 for interactivity
import Link from "next/link"
import { IoCodeSlashSharp } from "react-icons/io5";
import { AiTwotoneCheckCircle, AiFillInstagram, AiFillTwitterSquare,  AiFillLinkedin, AiFillGithub } from "react-icons/ai"

function Footer(){
  return (
    <div className="flex flex-col justify-center items-center bg-blue-900 w-full py-28 overflow-x-hidden">

      <div className="mt-10 flex flex-row justify-evenly items-center flex-wrap w-full">

            {/* ONE COLUMN */}
            <div className="flex flex-col justify-center items-center space-y-2 flex-wrap p-6 self-start ">

              <h2 className="text-white text-left font-bold uppercase text-3xl mx-4 banner-text">Company</h2>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">company</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm  font-normal hover:shadow-xl over:text-gray-400 transition-transform duration-200 ease-in-out mx-4 banner-text">About Us</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm  font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">Our Team</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm  font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">Blog</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">Contact</span>
                </Link>
            </div>

           {/* ONE COLUMN */}
            <div className="flex flex-col justify-center items-center space-y-2 flex-wrap self-start p-6">

              <h2 className="text-white text-left font-bold uppercase text-3xl mx-4 banner-text">Company</h2>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">company</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm  font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">About Us</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm  font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">Our Team</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm  font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">Blog</span>
                </Link>

                <Link className="self-start" href="/">
                  <span className="text-left banner-text text-gray-300 text-sm font-normal hover:shadow-xl hover:text-blue-400 transition-transform duration-200 ease-in-out mx-4 banner-text">Contact</span>
                </Link>
            </div>



        </div>


      <div className="mt-10">
        <span className="text-white font-bold text-center text-xl uppercase"> MADE WITH NEXT JS</span>
        <div className="flex flex-row justify-evenly items-center w-52 my-4">
          <AiFillInstagram className="h-8 w-8 text-white hover:scale-110 transition-all duration-150 ease-out " />
          <AiFillGithub className="h-8 w-8 text-white hover:scale-110 transition-all duration-150 ease-out " />
          <AiFillTwitterSquare className="h-8 w-8 text-white hover:scale-110 transition-all duration-150 ease-out " />
        </div>
        <span className="text-gray-300 font-thin text-center text-base">© all copyrights reserved, 2025</span>
      </div>
    </div>
    
  );
};

export default Footer;
