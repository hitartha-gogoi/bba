'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import PayFee from '@/components/pay-fee';

export default function Directory() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white pt-20">

      <Navbar textColor="black" />
    
      <h1 className='text-black'>Pay Fee</h1>

       <PayFee />
        <Footer />
      

    </div>
  );
}
