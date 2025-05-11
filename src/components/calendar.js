import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import "tailwindcss/tailwind.css";
import EventList from "@/components/event-list";

const Calendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };


   const specialEventDates = events.map((event) => new Date(event.startDate));

   const selectedDayEvents = events.filter((event) =>
    selectedDate ? isSameDay(new Date(event.date), selectedDate) : false
   );


  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


  return (
    <div className="min-h-4/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-4"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Calendar
        </h1>

        <DatePicker
          inline
          selected={selectedDate}
          onChange={handleDateChange}
          calendarClassName="w-full"
          dayClassName={(date) => {
            const baseClass =
              "transition duration-300 ease-in-out hover:bg-blue-300 rounded-full ";
            const isSpecial = specialEventDates.some((d) => isSameDay(d, date));
            return isSpecial
              ? `${baseClass} bg-red-500 text-white font-semibold`
              : baseClass;
          }}
        />
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white  p-6 rounded-xl shadow-xl max-w-2xl min-w-sm h-4/5 w-full text-center overflow-y-auto border "
            >
              
              <div className="flex flex-row justify-between items-center w-full">
                <h2 className="text-gray-600 mb-4"> {selectedDate?.toDateString()} </h2>
                <button onClick={closePopup} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"> Close </button>
              </div>

              <EventList events={events} dateSelected={selectedDate} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Calendar;