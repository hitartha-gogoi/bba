'use client';

import { useState, useRef } from 'react';

export default function Carousel() {
  const carouselRef = useRef(null);

  const cards = [
    { id: 1, title: 'Card One', description: 'This is the first card.' },
    { id: 2, title: 'Card Two', description: 'This is the second card.' },
    { id: 3, title: 'Card Three', description: 'This is the third card.' },
    { id: 4, title: 'Card Four', description: 'This is the fourth card.' },
    { id: 5, title: 'Card Five', description: 'This is the fifth card.' },
  ];

  return (
    <div className="w-full px-6 py-12 bg-gray-50">
      <div
        ref={carouselRef}
        className="flex overflow-x-auto gap-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="min-w-[250px] max-w-[250px] snap-start shrink-0 rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
