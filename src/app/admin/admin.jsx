'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';// search icon from lucide-react (already available in Next 15)
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";


export default function Admin({ initialLawyers }) {
  const [query, setQuery] = useState('');

  const [ overlayLawyerName, setOverlayLawyerName ] = useState('')
  const [ overlayLawyerEmail, setOverlayLawyerEmail ] = useState('')  
  const [ overlayLawyerDescription, setOverlayLawyerDescription ] = useState('')
  const [ overlayLawyerPhoto, setOverlayLawyerPhoto ] = useState('')  
  const [ overlayLawyerPhone, setOverlayLawyerPhone ] = useState('')
  const [ overlayLawyerId, setOverlayLawyerId ] = useState('')

  const [startDate, setStartDate] = useState(new Date());
  const [ endDate, setEndDate] = useState(new Date());
  const [overlay, setOverlay] = useState(false);


  // create a progress state for showing activityIndicator when handleSubmit is called and turn off when the response is received
  const [isLoading, setIsLoading] = useState(false);

  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ photo, setPhoto ] = useState(null)
  const [ lawyers, setLawyers ] = useState(initialLawyers || [])

  // local url = http://localhost:8080

  // production url = https://bba-backend.onrender.com

  const base_url = "http://localhost:8080"

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    // add validation for file must be needed
    if (!file) {  
      console.error('No file selected');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit 
      console.error('File size exceeds 5MB limit');
      alert('File size exceeds 5MB limit');
      return;
    }

    if (file) {
      // Handle the file upload logic here
      console.log('File uploaded:', file.name);
      alert(`File selected: ${file.name}`);
      setPhoto(file)
    }
  };

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setQuery(searchQuery);
    // Implement the search logic here, e.g., filter users based on the search query

  }

  // fetch the users from the server and show them in a table, and also add a delete button for each user, and also add a edit button for each user
  const fetchLawyers = async () => {
    try{
    const response = await fetch(`${base_url}/lawyers`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error('Error fetching users:', response.statusText);
      return;
    }
    const data = await response.json();
    console.log('lawyers:', data);
    setLawyers(data.users);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
  };


  const handleSubmit = async (event) => {

    // add validation for all fields must be filled
    if (!username || !email || !password || !phone || !description || !photo) {
      console.error('All fields are required');
      alert('All fields are required');
      event.preventDefault();
      return;
    }
    if (password.length < 8) {
      console.error('Password must be at least 8 characters long');
      alert('Password must be at least 8 characters long');
      event.preventDefault();
      return;
    }

    // phone number must be 10 digits long
    if (phone.length !== 10) {
      console.error('Phone number must be 10 digits long');
      alert('Phone number must be 10 digits long');
      event.preventDefault();
      return;
    }
    if (!/^\d+$/.test(phone)) {
      console.error('Phone number must be a valid number');
      alert('Phone number must be a valid number');
      event.preventDefault();
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.error('Email must be a valid email address');
      alert('Email must be a valid email address');
      event.preventDefault();
      return;
    }
    // what does username regex do explain it in comments
    if (!/^[a-zA-Z0-9._-]{3,}$/.test(username)) {
      console.error('Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens');
      alert('Username must be at least 3 characters long and can only contain letters, numbers, dots, underscores, and hyphens');
      event.preventDefault();
      return;
    }


    console.log("submit")
    event.preventDefault();
    const formData = new FormData(); 
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('description', description);
    formData.append('photo', photo); 
    

    setIsLoading(true)

    const response = await fetch(`${base_url}/create-user`, {
      method: 'POST',
      body: formData,
    });

    if(response.status === 400) {
      console.log("user already exists")  
      setIsLoading(false)
      alert("user already exists")
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("user not found")
      setIsLoading(false)
      alert("user not found")
    } else if (response.status === 200) { 
      console.log("user created")
      setIsLoading(false)
      alert("user created")
      setUsername('')
      setEmail('')
      setPassword('')
      setPhone('')
      setDescription('')
      setPhoto(null)
      fetchLawyers()
    }

    if (!response.ok) {
      console.error('Error creating user:', response.statusText);
    } 
  }


  return (
    <div className="flex flex-col items-center justify-center w-full bg-white pt-20 overflow-x-hidden">

      {/* create a loader using conditional rendering for isLoading using beautiful tailwind css animation , add a circle loading animation using tailwind css*/}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="loader">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="text-gray-700 mt-4">Loading...</p>
            
          </div>
        </div>
      )}
    
      <Navbar textColor="black" />

       {/* Overlay with Framer Motion */}
       <AnimatePresence>
        {overlay && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOverlay(false)}
            />

            {/* content card */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
                {/* close button */}
                <button style={{ pointerEvents: "auto" }} onClick={() => setOverlay(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-50">
                  X
                </button>

                {/* large image */}
                <div className="w-full h-80 relative">
                  <Image
                    src={overlayLawyerPhoto || "https://via.placeholder.com/300"} // default image if no photo is available
                    alt="Lawyer Image"
                    layout="fill"
                    objectFit="cover"
                    className="w-4/5 h-96 object-contain"
                  />
                </div>

                {/* details */}
                <div className="p-6 space-y-2">
                  <p className="font-bold text-black text-lg">
                   {overlayLawyerName}
                  </p>
                  <p className="text-gray-700">
                   {overlayLawyerEmail}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                   {overlayLawyerDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

        <div className="relative w-4/5 my-4  flex flex-col items-center justify-center">
        
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md"
          />
        </div>

      
      {/* TABLE */}

      <div className="flex flex-col justify-evenly items-center w-full sm:w-4/5 px-4 ">
      {/* A TABLE COMPONENT */}

      {lawyers.map((lawyer, index)=>{

        return (

        <div key={index} className="flex flex-row justify-evenly items-center p-4  w-full rounded-md">
          <div onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlay(true) }}  className="flex flex-row justify-start flex-wrap items-center py-2 w-full sm:w-4/5">
             {lawyer.photo ? ( <Image height={60} width={60} className="sm:rounded-md rounded-full h-10 w-10" src={lawyer.photo || "https://via.placeholder.com/60"} alt={lawyer.username || "Lawyer Image"} />) : ( <div className="w-[60px] h-[60px] bg-gray-300 rounded-md" />)}
            <div className="flex flex-col justify-start items-center py-2 ml-4">
              <span className="text-black self-start font-semibold banner-text ">{lawyer.username}</span>
              <span className="text-gray-400 self-start font-semibold banner-text ">{lawyer.email}</span>
            </div>
          </div>
          <button onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlay(true) }} className="text-gray-700 text-sm hidden sm:block bg-gray-100 font-normal banner-text uppercase w-48 py-2 rounded-md text-center">view details</button>
        </div> 
        )
      })}

      </div>

        {/* create  a form in tailwind css to upload username, password, phone number, description, upload input for photo, also create a button type file input and it should look like upload file with high end animation using tailwind css, create a highly responsive form, it should cover like 3/5 width of full width */}
        <div className="w-full my-4 flex flex-row items-center justify-center flex-wrap space-x-0 sm:space-x-20 space-y-10 sm:space-y-0 bg-gray-100 rounded-lg shadow-md p-6">
          
          <form className="max-w-6xl flex flex-col items-center justify-center" onSubmit={handleSubmit}>
            <h2 className="text-2xl text-gray-800 font-bold mb-4 uppercase">Create New Lawyer</h2>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Phone Number" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Description" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md"></textarea>
            
            <label className="flex items-center justify-center w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-sm focus:shadow-md">
              Upload Photo
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>

            <button type="submit" className="w-full p-3 font-bold bg-blue-500 uppercase hover:scale-105 text-white rounded-md hover:bg-blue-600 transition-all duration-300 shadow-sm focus:shadow-md">Create lawyer</button>
          </form>


           {/*  create an another form adding inputs, name, link, link type (which is a dropdown list), page name */}
        <form className="max-w-6xl self-start flex flex-col items-center justify-center bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">add important links</h2>
          <input type="text" placeholder="Title" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" placeholder="description" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" placeholder="Link" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <select className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="">Select Link Type</option>
            <option value="type1">photo</option>
            <option value="type2">hyperlink</option>
          </select>
          <select className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="">Category</option>
            <option value="type1">Carousels</option>
            <option value="type2">Gallery Image</option>
            <option value="type3">Footer Links (PRACTICE AREAS)</option>
            <option value="type4">Footer Links (COMPANY)</option>
          </select>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white hover:scale-105 rounded-md uppercase font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm focus:shadow-md">add link</button>
        </form>


        <form className="max-w-6xl self-start flex flex-col items-center justify-center bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">create event</h2>
          <input type="text" placeholder="event name" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" placeholder="description" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <h3 className="w-full text-left text-gray-700 font-bold text-base mt-2 uppercase"> start date </h3>
          <DatePicker selected={startDate} className='text-gray-700 mt-2' onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp"  />
          <h3 className="w-full text-left text-gray-700 font-bold text-base mt-4 uppercase"> end date </h3>
          <DatePicker className='text-gray-700 mt-2' selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp"  />;
          <select className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="">Select Event Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white uppercase hover:scale-105 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-sm focus:shadow-md font-bold">Add Event</button>
        </form>


        </div>


       
        {/* create a table to show all the users, with search functionality, and also add a delete button for each user, and also add a edit button for each user */}
     
        

        <Footer />
      

    </div>
  );
}
