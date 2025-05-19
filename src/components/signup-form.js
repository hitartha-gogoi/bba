"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';

export default function SignupForm() {

  const base_url = "https://bba-backend.onrender.com"

  const [form, setForm] = useState({ username: "", email: "", password: "", type: 'user', });
  const [loading, setLoading] = useState(false);

  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json()

      if(res.status == 200){
        setLoading(false);
        alert("signed up sucessfully!")
        console.log("token: ", data.token)
        router.refresh();
      }

      if(res.status == 400){
        setLoading(false);
        alert("An User Already Exist!")
        console.log("token: ", data.token)
        router.refresh();
      }

      if(res.status == 403){
        setLoading(false);
        alert("An Owner Already Exist!")
        console.log("token: ", data.token) 
        router.refresh();
      }
      
    } catch (err) {
      console.error(err.message);
    }
  };

  
  return (
    <div className="flex items-center justify-center px-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-zinc-800 mb-6 text-center">
          Add Admin Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 text-black py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
          />
          <div className="space-y-2">
          <label htmlFor="role" className="text-gray-600 text-sm">Role</label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-black transition"
          >
            <option value="owner">Owner</option>
            <option value="user">User</option>
            <option value="developer">Developer</option>
          </select>
        </div>

          <button
            type="submit"
            className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-zinc-800 transition-all"
            disabled={loading}
          >
            {loading ? "Signing up..." : "ADD"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
