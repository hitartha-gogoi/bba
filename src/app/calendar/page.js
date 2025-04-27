'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"

export default function Directory() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white pt-20">
        <Navbar textColor="black" />
    
      <div className="max-w-4xl my-auto">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 shadow-sm focus:shadow-md"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
