import React from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaUsers, FaMapMarkerAlt } from 'react-icons/fa'; // Importing the map location icon
import { FaRegCalendarAlt } from 'react-icons/fa';

const events = [
  {
    date: 'May 10',
    day: 'Saturday',
    time: '10:00 AM',
    title: 'Legal Symposium 2025',
    organizer: 'Bar Association India',
    location: 'Supreme Court Hall, New Delhi',
    status: "Register Now",
    attendees: 120,
    avatars: ['FaUser', 'FaUser', 'FaUsers'],
    image: 'https://i.imgur.com/J1Sjk5J.png',
  },
  {
    date: 'May 15',
    day: 'Thursday',
    time: '2:00 PM',
    title: 'Intellectual Property & Law Webinar',
    organizer: 'Bar Association India',
    location: 'Virtual Event',
    status: 'Ongoing',
    attendees: 95,
    avatars: ['FaUser', 'FaUsers', 'FaUser'],
    image: 'https://i.imgur.com/Cy3Tf4K.png',
  },
  {
    date: 'May 20',
    day: 'Tuesday',
    time: '4:00 PM',
    title: 'Corporate Law Roundtable Discussion',
    organizer: 'Bar Association India',
    location: 'The Leela Palace, Bengaluru',
    status: 'Sold out',
    attendees: 80,
    avatars: ['FaUser', 'FaUsers', 'FaUser'],
    image: 'https://i.imgur.com/6A4wF5a.png',
  },
  {
    date: 'May 20',
    day: 'Tuesday',
    time: '4:00 PM',
    title: 'Corporate Law Roundtable Discussion',
    organizer: 'Bar Association India',
    location: 'The Leela Palace, Bengaluru',
    status: "Ended",
    attendees: 80,
    avatars: ['FaUser', 'FaUsers', 'FaUser'],
    image: 'https://i.imgur.com/6A4wF5a.png',
  },
];


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

export default function EventList() {
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
        {events.map((event, i) => (
          <motion.div
            key={i}
            className="mb-10 ml-4 relative"
            variants={itemVariants}
          >
            <motion.div
              className="absolute -left-2.5 top-2 w-3 h-3 bg-blue-800 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.15 }}
            />
            <p className="text-sm text-gray-600 mb-1">
              {event.date} <span className="text-gray-500">{event.day}</span>
            </p>

            <motion.div
              whileHover={{ scale: 1.015 }}
              className="flex justify-between items-center bg-white rounded-xl p-4 shadow-lg gap-4 transition-all duration-200 hover:bg-blue-800 hover:text-white"
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-500">{event.time}</p>
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-sm text-gray-500">By {event.organizer}</p>
                <p className="text-sm text-gray-400">
                  <FaMapMarkerAlt className="inline text-gray-400" /> {event.location}
                </p>

                {event.status && (
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded w-fit">
                    {event.status}
                  </span>
                )}

                <div className="flex items-center gap-1 mt-1">
                  {event.avatars.map((Icon, idx) => (
                    <span key={idx} className="text-xl">
                      <Icon /> {/* Render FontAwesome icons */}
                    </span>
                  ))}
                  <span className="text-sm text-gray-400">+{event.attendees}</span>
                </div>
              </div>
              <img
                src={event.image}
                alt={event.title}
                className="w-28 h-28 object-cover rounded-md"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
