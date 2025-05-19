'use client';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

export default function ContactPage() {

  const base_url = "https://bba-backend.onrender.com"

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`${base_url}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' }); // Clear form
      setTimeout(() => setSubmitted(false), 4000);
    } else {
      console.error('Failed to send message:', await res.text());
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
};


  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Navbar textColor="black" />

      <main className="flex flex-col items-center justify-center px-6 py-20 sm:px-10 lg:px-40">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-6 text-center"
        >
         
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-600 text-center mb-12 max-w-xl"
        >
        
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-start space-x-4">
               <MapPin className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">Office Address</p>
                <p className="text-gray-700">
                  Bar Association Bahadurgarh,
                  <br />
                  New Court Complex, Balour Road,
                  <br />
                  Bahadurgarh - 124507, District Jhajjar, Haryana
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <div>
                <p className="font-semibold">Email</p>
                <a href="mailto:bahadurgarhbarassociation@gmail.com" className="text-blue-600 hover:underline">
                  bahadurgarhbarassociation@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="4"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              {submitted ? 'Message Sent ✔️' : 'Send Message'}
            </button>
          </motion.form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
