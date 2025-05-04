'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import Collage from '@/components/collage';
import OverlappingImages from '@/components/photographs';

export default function Directory() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white pt-20">

        <Navbar textColor="black" />

        <div className="flex flex-col items-center justify-center w-full">
        <OverlappingImages />
        </div>

        <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-black">Our Legal Team in Action</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
                  Real professionals. Real experience. Real trust.
            </p>
        </div>

        <Collage />

      <Footer />
    </div>
  );
}
