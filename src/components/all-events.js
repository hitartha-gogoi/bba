'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'; // Importing the map location icon
import { FaRegCalendarAlt } from 'react-icons/fa';
import EventStatusBadge from './event-status-badge';

const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function AllEvents({ events }) {

   const specialEvents = events || []

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 py-8 text-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className='flex flex-row justify-between items-center w-full'>
       <h1 className="text-2xl font-bold mb-6">All Events</h1>
       <FaRegCalendarAlt className="text-gray-400 mr-2 scale-125 hover:scale-150 transition-transform duration-200 ease-in-out cursor-pointer" />
      </div>
      
      <div className="relative border-l border-gray-300">
        {specialEvents.map((event, i) => (
          <motion.div
            key={i}
            className="mb-10 ml-4 relative"
            variants={itemVariants}
          >
            {
            <>
            

             <p className="text-sm text-gray-600 mb-1">{new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' })} {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>

            <motion.div
              whileHover={{ scale: 1.015 }}
              className="flex justify-between items-center bg-white rounded-xl p-4 shadow-lg gap-4 transition-all duration-200 hover:bg-blue-800 hover:text-white"
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">Starting time: {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}</p>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">{event.description}</p>
                <p className="text-sm text-gray-400">
                  <FaMapMarkerAlt className="inline text-gray-400" /> {event.location}
                </p>

                <EventStatusBadge startDate={event.startDate} endDate={event.endDate} />

                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm text-gray-400"> Departure Time: {new Date(event.endDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true, })}</span>
                </div>
              </div>
              <img
                src={event.photo}
                alt={event.title}
                className="w-28 h-28 object-cover rounded-md"
              />
            </motion.div>
           </>
        }
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
