'use client';
import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import AllEvents from "@/components/all-events"
import EventList from '@/components/event-list';
import Calendar from '@/components/calendar';

export default function Event({ initialEvents }) {

  const [ query, setQuery] = useState('');
  const [ events, setEvents ] = useState(initialEvents || [])

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white pt-20">
      
        <Navbar textColor="black" />

        <Calendar events={events} />
        
        <AllEvents events={events} />

      <Footer />
    </div>
  );
}
