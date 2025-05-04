import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  {
    url: 'https://img.freepik.com/free-photo/closeup-shot-person-writing-book-with-gavel-table_181624-57173.jpg?t=st=1746195035~exp=1746198635~hmac=2d9d03951c53afc967addbe3f7ae5985898aa9cdcd1d82569fefae9aefba4a67&w=1380',
    heading: 'National Legal Summit 2025',
    caption: 'An annual gathering of India’s brightest legal minds to discuss crucial legal reforms, the future of Indian law, and uphold the rule of justice.',
  },
  {
    url: 'https://img.freepik.com/free-photo/high-angle-shot-gavel-scale-wooden-surface_181624-33848.jpg?t=st=1746195092~exp=1746198692~hmac=59edfba5866e6dacf700576174116832823f5bd79a28903c7a26cf702d05521a&w=1380',
    heading: 'Workshop on Constitutional Law',
    caption: 'Join legal experts as they discuss the nuances of Indian constitutional law, its evolution, and challenges in the current legal landscape',
  },
  {
    url: 'https://img.freepik.com/free-photo/top-view-career-guidance-items-judges_23-2149443469.jpg?t=st=1746195123~exp=1746198723~hmac=533aba512f001cc7b50d955cb2dbf4f783abb62f670038391849820ae9168607&w=1380',
    heading: 'Advocacy Training for Young Lawyers',
    caption: 'A comprehensive training session designed for young advocates to refine their advocacy skills and gain insights from experienced legal professionals.',
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextSlide, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="relative max-w-full w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] xl:h-[80vh] aspect-[16/9] overflow-hidden rounded-2xl shadow-xl bg-white">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${images[index].url})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {images[index].heading}
              </motion.h1>
              <motion.p
                className="text-md w-80 sm:w-3/5 sm:text-lg md:text-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {images[index].caption}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full"
        >
          <ChevronRight size={32} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Carousel;
