'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, X, Pencil } from 'lucide-react';

export default function Admin({ initialLawyers, initialEvents, initialLinks }) {

  // SEARCH QUERY STATE
  const [ query, setQuery] = useState('');
  const [ eventQuery, setEventQuery ] = useState('')

  // OVERLAY STATES FOR LAWYER POPUP
  const [ overlayLawyerId, setOverlayLawyerId ] = useState('')
  const [ overlayLawyerName, setOverlayLawyerName ] = useState('')
  const [ overlayLawyerEmail, setOverlayLawyerEmail ] = useState('')  
  const [ overlayLawyerDescription, setOverlayLawyerDescription ] = useState('')
  const [ overlayLawyerPhoto, setOverlayLawyerPhoto ] = useState('')  
  const [ overlayLawyerPhone, setOverlayLawyerPhone ] = useState('')
  const [ overlay, setOverlay] = useState(false);

  // OVERLAY STATES FOR EVENT POPUP
  const [ overlayEvent, setOverlayEvent ] = useState(false);
  const [ overlayEventName, setOverlayEventName ] = useState('')
  const [ overlayEventDescription, setOverlayEventDescription ] = useState('')
  const [ overlayEventLocation, setOverlayEventLocation ] = useState('')
  const [ overlayEventPhoto, setOverlayEventPhoto ] = useState('')
  const [ overlayEventId, setOverlayEventId ] = useState('')
  const [ overlayEventStartDate, setOverlayEventStartDate ] = useState('')
  const [ overlayEventEndDate, setOverlayEventEndDate ] = useState('')

  // // OVERLAY STATES FOR LINK POPUP
  const [ overlayLink, setOverlayLink ] = useState(false);
  const [ overlayLinkTitle, setOverlayLinkTitle ] = useState('')
  const [ overlayLinkDescription, setOverlayLinkDescription ] = useState('')
  const [ overlayLinkType, setOverlayLinkType ] = useState('')
  const [ overlayLinkUrl, setOverlayLinkUrl ] = useState('')
  const [ overlayLinkCategory, setOverlayLinkCategory ] = useState('')
  const [ overlayLinkId, setOverlayLinkId ] = useState('')

  // ACTIVITY INDICATOR LOADING STATE
  const [isLoading, setIsLoading] = useState(false);

  // STATES FOR LAWYER FORM
  const [ username, setUsername ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ photo, setPhoto ] = useState(null)

  // STATES FOR EVENT FORM
  const [ eventName, setEventName ] = useState('')
  const [ eventLocation, setEventLocation ] = useState('')
  const [ eventDescription, setEventDescription ] = useState('')
  const [ startDate, setStartDate ] = useState(new Date())
  const [ endDate, setEndDate ] = useState(new Date())
  const [ eventPhoto, setEventPhoto ] = useState(null)


  // STATES FOR LINK FORM
  const [ linkTitle, setLinkTitle ] = useState('')
  const [ linkDescription, setLinkDescription ] = useState('')
  const [ linkType, setLinkType ] = useState('photo')
  const [ linkUrl, setLinkUrl ] = useState('')
  const [ linkCategory, setLinkCategory ] = useState('carousels-1')
  
  // STATES TO STORE EVENTS, LINKS AND LAWYERS RECEIVED FROM BACKEND
  const [ events, setEvents ] = useState(initialEvents || [])
  const [ links, setLinks ] = useState(initialLinks || [])
  const [ lawyers, setLawyers ] = useState(initialLawyers || [])

  // local url = http://localhost:8080
  // production url = https://bba-backend.onrender.com

  const base_url = "https://bba-backend.onrender.com"

  // FILE HANDLING FOR LAWYER PHOTO
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

  // FILE HANDLING FOR EVENT PHOTO
  const handleEventFileUpload = (event) => {
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
      setEventPhoto(file);
    }
  };

  //SEARCH LAWYERS
  const search = async()=>{
    const response = await fetch(`${base_url}/search?username=${query}`, {
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
    setLawyers(data.lawyers);
    console.log('Search results:', data);
  }

  // SEARCH EVENTS
  async function searchEvents() {
    const response = await fetch(`${base_url}/search-event?title=${eventQuery}`, {
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
    setEvents(data.events);
    console.log('Search results:', data);
  }

  // FETCH LAWYERS
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

  // FETCH EVENTS
  const fetchEvents = async () => {
    try {
      const response = await fetch(`${base_url}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Error fetching events:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('events:', data);
      setEvents(data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  // FETCH LINKS
  const fetchLinks = async () => {
    try { 
      const response = await fetch(`${base_url}/links`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.error('Error fetching links:', response.statusText);
        return;
      }
      const data = await response.json();
      console.log('links:', data);
      setLinks(data.links);
    } catch (error) {
      console.error('Error fetching links:', error);
    }
  };  

  // CREATES LAWYER AT THE BACKEND
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

  // CREATES EVENT AT THE BACKEND
  const postEvent = async (event) => {

    //add validation for all fields must be filled
    if (!eventName || !eventDescription || !startDate || !endDate || !eventPhoto) {
      console.error('All fields are required');
      alert('All fields are required');
      event.preventDefault();
      return;
    }

    if (startDate > endDate) {
      console.error('Start date must be before end date');
      alert('Start date must be before end date');
      event.preventDefault();
      return;
    }

    if (eventName.length < 3) {
      console.error('Event name must be at least 3 characters long');
      alert('Event name must be at least 3 characters long');
      event.preventDefault();
      return;
    }

    if (eventDescription.length < 10) {
      console.error('Event description must be at least 10 characters long');
      alert('Event description must be at least 10 characters long');
      event.preventDefault();
      return;
    }

    if (!eventPhoto) {
      console.error('Event photo is required');
      alert('Event photo is required');
      event.preventDefault();
      return;
    }
    if (eventPhoto.size > 5 * 1024 * 1024) { // 5MB limit
      console.error('File size exceeds 5MB limit');
      alert('File size exceeds 5MB limit');
      event.preventDefault();
      return;
    }

    if (!eventPhoto.type.startsWith('image/')) {
      console.error('File must be an image');
      alert('File must be an image');
      event.preventDefault();
      return;
    }

    console.log("submit")
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', eventName);
    formData.append('description', eventDescription);
    formData.append('photo', eventPhoto);
    formData.append('location', eventLocation);
    formData.append('startDate', startDate.toISOString());
    formData.append('endDate', endDate.toISOString());

    setIsLoading(true);

    const response = await fetch(`${base_url}/create-event`, {
      method: 'POST',
      body: formData,
    });

    if(response.status === 400) {
      console.log("event already exists")  
      setIsLoading(false)
      alert("event already exists")
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("event not found")
      setIsLoading(false)
      alert("event not found")
    } else if (response.status === 200) { 
      console.log("event created")
      setIsLoading(false)
      alert("event created")
      setEventName('')
      setDescription('')
      setStartDate(new Date())
      setEndDate(new Date())
      fetchEvents()
    }

    if (!response.ok) {
      console.error('Error creating event:', response.statusText);
    }
  };


    // CREATES LINK AT THE BACKEND
  const addLink = async (event) => {

    //add validation for all fields must be filled
    if (!linkTitle || !linkDescription || !linkUrl || !linkType || !linkCategory) {
      console.error('All fields are required');
      alert('All fields are required');
      event.preventDefault();
      return;
    }

    if (linkTitle.length < 3) {
      console.error('Event name must be at least 3 characters long');
      alert('Event name must be at least 3 characters long');
      event.preventDefault();
      return;
    }

    if (linkDescription.length < 10) {
      console.error('Event description must be at least 10 characters long');
      alert('Event description must be at least 10 characters long');
      event.preventDefault();
      return;
    }

    if (!linkUrl) {
      console.error('Event photo is required');
      alert('Event photo is required');
      event.preventDefault();
      return;
    }

    console.log("submit")
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', linkTitle);
    formData.append('description', linkDescription);
    formData.append('link', linkUrl);
    formData.append('type', linkType);
    formData.append('category', linkCategory);

    setIsLoading(true);

    const response = await fetch(`${base_url}/create-link`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({
        title: linkTitle,
        description: linkDescription,
        link: linkUrl,
        type: linkType,
        category: linkCategory
      }),
    });

    if(response.status === 400) {
      console.log("Link already exists")  
      setIsLoading(false)
      alert("Link already exists")
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("Link not found")
      setIsLoading(false)
      alert("Link not found")
    } else if (response.status === 200) { 
      console.log("Link created")
      setIsLoading(false)
      alert("Link created")
      setEventName('')
      setDescription('')
      setStartDate(new Date())
      setEndDate(new Date())
      fetchEvents()
    }

    if (!response.ok) {
      console.error('Error creating link:', response.statusText);
    }
  };


  // DELETE LAWYER FROM BACKEND
  const deleteLawyer = async (id) => {
    setIsLoading(true)
    setOverlay(false)
    const response = await fetch(`${base_url}/lawyer/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.status === 400) {
      console.log("lawyer already exists")  
      setIsLoading(false)
      alert("lawyer already exists")
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("lawyer not found")
      setIsLoading(false)
      alert("lawyer not found")
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("lawyer not found")
      setIsLoading(false)
      alert("lawyer not found")
    } else if (response.status === 200) { 
      console.log("lawyer deleted")
      setIsLoading(false)
      alert("lawyer deleted")
      fetchLawyers()
    }

    if (!response.ok) {
      console.error('Error deleting lawyer:', response.statusText);
    }
  };

  // DELETE EVENT FROM BACKEND
  const deleteEvent = async (id) => {
    setIsLoading(true);
    setOverlayEvent(false);
    const response = await fetch(`${base_url}/event/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.status === 400) {
      console.log("event already exists");
      setIsLoading(false);
      alert("event already exists");
    } else if (response.status === 500) {
      console.log("error");
      setIsLoading(false);
      alert("error");
    } else if (response.status === 404) {
      console.log("event not found");
      setIsLoading(false);
      alert("event not found");
    } else if (response.status === 200) {
      console.log("event deleted");
      setIsLoading(false);
      alert("event deleted");
      fetchEvents();
    }

    if (!response.ok) {
      console.error('Error deleting event:', response.statusText);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center w-full bg-white pt-20 overflow-x-hidden">

      {/* CIRCLE LOADING ANIMATION */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="loader">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="text-gray-700 mt-4">Loading...</p>
            
          </div>
        </div>
      )}
    
      <Navbar textColor="black" />

       {/* OVERLAY FOR LAWYER POPUP */}
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
              className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
                {/* close button */}
                <button style={{ pointerEvents: "auto" }} onClick={() => setOverlay(false)} className="absolute top-4 right-2 text-gray-600 hover:text-gray-800 z-50">
                  <X className="h-6 w-6" />
                </button>

                <button style={{ pointerEvents: "auto" }} onClick={() => deleteLawyer(overlayLawyerId)} className="absolute top-4 right-12 text-gray-600 hover:text-gray-800 z-50">
                  <Trash2 className="h-6 w-6" />
                </button>

                <button style={{ pointerEvents: "auto" }} onClick={() => setOverlayEvent(false)} className="absolute top-4 right-24 text-gray-600 hover:text-gray-800 z-50">
                  <Pencil className="h-6 w-6" />
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

      {/* OVERLAY FOR EVENT POPUP */}
       <AnimatePresence>
        {overlayEvent && (
          <>
            {/* backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOverlayEvent(false)}
            />

            {/* content card */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-[9999] p-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-lg w-full">
                {/* close button */}
                <button style={{ pointerEvents: "auto" }} onClick={() => setOverlayEvent(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-50">
                  <X className="w-6 h-6 stroke-2 text-gray-700" />
                </button>

                <button style={{ pointerEvents: "auto" }} onClick={() => deleteEvent(overlayEventId)} className="absolute top-4 right-14 text-gray-600 hover:text-gray-800 z-50">
                  <Trash2 className="h-6 w-6" />
                </button>

                <button style={{ pointerEvents: "auto" }} onClick={() => setOverlayEvent(false)} className="absolute top-4 right-24 text-gray-600 hover:text-gray-800 z-50">
                  <Pencil className="h-6 w-6" />
                </button>

                {/* large image */}
                <div className="w-full h-80 relative">
                  <Image
                    src={overlayEventPhoto || "https://via.placeholder.com/300"} // default image if no photo is available
                    alt="Event Image"
                    layout="fill"
                    objectFit="cover"
                    className="w-4/5 h-72 object-contain"
                  />
                </div>

                {/* details */}
                <div className="p-6 space-y-2">
                  <p className="font-bold text-black text-lg">
                   {overlayEventName}
                  </p>
                  <p className="text-gray-700">
                  <span className="text-gray-600"> location: </span> {overlayEventLocation}
                  </p>
                  <p className="text-gray-700">
                  <span className="text-gray-600"> start date: </span> {new Date(overlayEventStartDate).toLocaleDateString('en-US', { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' })} {new Date(overlayEventStartDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <p className="text-gray-700">
                  <span className="text-gray-600"> end date: </span> {new Date(overlayEventEndDate).toLocaleDateString('en-US', { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' })} {new Date(overlayEventEndDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                   {overlayEventDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* SEARCH BAR */}
        <div className="relative w-4/5 my-4  flex flex-col items-center justify-center">      
          <input type="text" value={query} onChange={(e) =>{ setQuery(e.target.value); search(); }} placeholder="Search Lawyers" className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
        </div>

      {/* SEARCH TABLE FOR USERS */}
      <div className="flex flex-col justify-evenly items-center w-full sm:w-4/5 px-4 ">
      {/* A TABLE COMPONENT */}

      {lawyers.map((lawyer, index)=>{

        return (

        <div key={index} className="flex flex-row justify-evenly items-center p-4  w-full rounded-md z-9999">
          <div onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerId(lawyer._id); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlay(true) }}  className="flex flex-row justify-start flex-wrap items-center py-2 w-full sm:w-4/5">
             {lawyer.photo ? ( <Image height={60} width={60} className="sm:rounded-md rounded-full h-10 w-10" src={lawyer.photo || "https://via.placeholder.com/60"} alt={lawyer.username || "Lawyer Image"} />) : ( <div className="w-[60px] h-[60px] bg-gray-300 rounded-md" />)}
            <div className="flex flex-col justify-start items-center py-2 ml-4">
              <span className="text-black self-start font-semibold banner-text ">{lawyer.username}</span>
              <span className="text-gray-400 self-start font-semibold banner-text ">{lawyer.email}</span>
            </div>
          </div>
          <button onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlayLawyerId(lawyer._id); setOverlay(true) }} className="text-gray-700 text-sm hidden sm:block bg-gray-100 font-normal banner-text uppercase w-48 py-2 rounded-md text-center">view details</button>
        </div> 
        )
      })}

      </div>

      {/* SEARCH BAR FOR EVENTS */}
        <div className="relative w-4/5 my-4  flex flex-col items-center justify-center">      
          <input value={eventQuery} onChange={(e)=> { setEventQuery(e.target.value); searchEvents(); }} type="text" placeholder="Search Events" className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
        </div>

      {/* TABLE FOR EVENTS */}
      <div className="flex flex-col justify-evenly items-center w-full sm:w-4/5 px-4 ">
      {/* A TABLE COMPONENT */}

      {events.map((event, index)=>{

        return (

        <div key={index} className="flex flex-row justify-evenly items-center p-4  w-full rounded-md">
          <div onClick={() => { setOverlayEventName(event.title); setOverlayEventLocation(event.location); setOverlayEventStartDate(event.startDate); setOverlayEventEndDate(event.endDate); setOverlayEventDescription(event.description); setOverlayEventPhoto(event.photo); setOverlayEventId(event._id); setOverlayEvent(true) }} className="flex flex-row justify-start flex-wrap items-center py-2 w-full sm:w-4/5">
             {event.photo ? ( <Image height={60} width={60} className="sm:rounded-md rounded-full h-10 w-10" src={event.photo || "https://via.placeholder.com/60"} alt={event.name || "Event Image"} />) : ( <div className="w-[60px] h-[60px] bg-gray-300 rounded-md" />)}
            <div className="flex flex-col justify-start items-center py-2 ml-4">
              <span className="text-black self-start font-semibold banner-text ">{event.title}</span>
              <span className="text-gray-400 self-start font-semibold banner-text ">{event.description}</span>
            </div>
          </div>
          <button className="text-gray-700 text-sm hidden sm:block bg-gray-100 font-normal banner-text uppercase w-48 py-2 rounded-md text-center">view details</button>
        </div>
        )
      })}

      </div>

        {/* ALL FORMS FOR DATA UPLOAD */}
        <div className="w-full my-4 flex flex-row items-center justify-center flex-wrap space-x-0 sm:space-x-20 space-y-10 sm:space-y-0 bg-gray-100 rounded-lg shadow-md p-6">
          
        {/* LAWYERS FORM */}
        <form className="max-w-6xl self-start flex flex-col items-center justify-center" onSubmit={handleSubmit}>
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

        {/* LINKS FORM */}
        <form onSubmit={addLink} className="max-w-6xl self-start flex flex-col items-center justify-center bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">add important links</h2>
          <input type="text" value={linkTitle} onChange={(e)=> setLinkTitle(e.target.value)} placeholder="Title" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={linkDescription} onChange={(e)=> setLinkDescription(e.target.value)} placeholder="description" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={linkUrl} onChange={(e)=> setLinkUrl(e.target.value)} placeholder="Link" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <select onChange={(e)=> setLinkType(e.target.value)} className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="photo">photo</option>
            <option value="hyperlink">hyperlink</option>
            <option value="pdf">PDF</option>
          </select>
          <select onChange={(e)=> setLinkCategory(e.target.value)} className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="carousels-1">Gallery Carousel 1</option>
            <option value="carousels-2">Gallery Carousel 2</option>
          </select>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white hover:scale-105 rounded-md uppercase font-bold hover:bg-blue-600 transition-all duration-300 shadow-sm focus:shadow-md">add link</button>
        </form>

        {/* EVENTS FORM */}
        <form onSubmit={postEvent} className="max-w-6xl self-start flex flex-col items-center justify-center bg-gray-100">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">create event</h2>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="event name" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="description" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="location" className="w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <h3 className="w-full text-left text-gray-700 font-bold text-base mt-2 uppercase"> start date </h3>
          <DatePicker selected={startDate} className='text-gray-700 mt-2' onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp"  />
          <h3 className="w-full text-left text-gray-700 font-bold text-base mt-4 uppercase"> end date </h3>
          <DatePicker className='text-gray-700 mt-2' selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp"  />;
          <label className="flex items-center justify-center w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-sm focus:shadow-md">
              Upload Photo
              <input type="file" onChange={handleEventFileUpload} className="hidden" />
          </label>
          <button type="submit" className="w-full p-3 bg-blue-500 text-white uppercase hover:scale-105 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-sm focus:shadow-md font-bold">Add Event</button>
        </form>

        </div>

        <Footer />
      
    </div>
  );
}
