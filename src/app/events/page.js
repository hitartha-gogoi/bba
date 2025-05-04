'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import Carousel from '@/components/carousel';
import EventList from '@/components/event-list';

export default function Directory() {
  const [query, setQuery] = useState('');



  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white pt-20">
      
        <Navbar textColor="black" />
        <Carousel />
        <EventList />

      <Footer />
    </div>
  );
}
