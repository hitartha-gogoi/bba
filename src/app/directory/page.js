'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"

export default function Directory() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white pt-20">

      <Navbar textColor="black" />
    
        <div className="relative w-4/5 my-4  flex flex-col items-center justify-center">
        
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md"
          />
        </div>

        <div className="w-full h-screen flex flex-col items-start justify-start bg-gray-100 p-4">

            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-4/5 mx-auto flex flex-col items-center justify-center">
                <h1 className='text-black'>Your Title Here</h1>
                <p>Your description here</p>
            </div>

        </div>

        <Footer />
      

    </div>
  );
}
