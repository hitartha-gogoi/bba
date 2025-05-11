'use client';
import { useState } from 'react';
import { Search } from 'lucide-react'; // search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import Gallery from "@/components/gallery";


export default function GalleryPage({ initialLinks }) {

  const [query, setQuery] = useState('');
  const [ links, setLinks ] = useState(initialLinks || [])

  return (
    <div className="relative flex flex-col items-center justify-center w-full bg-white pt-20">

        <Navbar textColor="black" />

        <div className="text-center my-20">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase text-black">Glimpse of gallery</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
                  Real professionals. Real experience. Real trust.
            </p>
        </div>

        <Gallery title={"Gallery Carousel 1"} category={"carousels-1"} items={links} />

        <Gallery title={"Gallery Carousel 2"} category={"carousels-2"} items={links} />

      <Footer />
    </div>
  );
}
