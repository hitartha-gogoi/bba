'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer"
import DatePicker from "react-datepicker";
import { motion, AnimatePresence } from 'framer-motion';
import "react-datepicker/dist/react-datepicker.css";
import { Trash2, X, Pencil } from 'lucide-react';
import SignupForm from '@/components/signup-form';
import { useRouter } from 'next/navigation'
import { FaTrash } from "react-icons/fa";
import Gallery from "@/components/gallery";

export default function Admin({ initialLawyers, initialEvents, initialLinks, initialAdmins, onLogout }) {

  // SEARCH QUERY STATE
  const [ query, setQuery] = useState('');
  const [ eventQuery, setEventQuery ] = useState('')
  const [ adminQuery, setAdminQuery ] = useState('')

  const adminUsername = localStorage.getItem('name')

  const router = useRouter()

  // OVERLAY STATES FOR LAWYER POPUP
  const [ overlayLawyerId, setOverlayLawyerId ] = useState('')
  const [ overlayLawyerName, setOverlayLawyerName ] = useState('')
  const [ overlayLawyerEmail, setOverlayLawyerEmail ] = useState('')  
  const [ overlayLawyerDescription, setOverlayLawyerDescription ] = useState('')
  const [ overlayLawyerPhoto, setOverlayLawyerPhoto ] = useState('')
  const [ overlayLawyerAddress, setOverlayLawyerAddress ] = useState("")
  const [ overlayFatherName, setOverlayFatherName ] = useState("")
  const [ overlayLawyerPhone, setOverlayLawyerPhone ] = useState('')
  const [ overlayLawyerMembership, setOverlayLawyerMembership ] = useState('')
  const [ overlayEnrolmentNumber, setOverlayEnrolmentNumber ] = useState('')
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
  const [ fatherName, setFatherName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ photo, setPhoto ] = useState(null)
  const [membershipDate, setMembershipDate] = useState(new Date());
  const [address, setAddress] = useState('');
  const [enrolmentNumber, setEnrolmentNumber] = useState('');

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
  const [ admins, setAdmins ] = useState(initialAdmins || [])

  //STATES FOR EDITABLE LAWYER FORM
  const [ editableLawyerId, setEditableLawyerId ] = useState(false)
  const [ editableLawyerForm, setEditableLawyerForm ] = useState(false)
  const [ editableUsername, setEditableUsername ] = useState(overlayLawyerName)
  const [ editableFatherName, setEditableFatherName ] = useState(overlayFatherName)
  const [ editableEmail, setEditableEmail ] = useState(overlayLawyerEmail || "")
  const [ editablePhone, setEditablePhone ] = useState('')
  const [ editableDescription, setEditableDescription ] = useState(overlayLawyerDescription)
  const [ editablePhoto, setEditablePhoto ] = useState(null)
  const [ editableMembershipDate, setEditableMembershipDate] = useState(overlayLawyerMembership);
  const [ editableAddress, setEditableAddress] = useState(overlayLawyerAddress);
  const [ editableEnrolmentNumber, setEditableEnrolmentNumber] = useState(overlayEnrolmentNumber);

  //STATES FOR EDITABLE EVENTS FORM
  const [ editableEventId, setEditableEventId ] = useState(false)
  const [ editableEventForm, setEditableEventForm ] = useState(false)
  const [ editableEventName, setEditableEventName ] = useState('')
  const [ editableEventLocation, setEditableEventLocation ] = useState('')
  const [ editableEventDescription, setEditableEventDescription ] = useState('')
  const [ editableStartDate, setEditableStartDate ] = useState(new Date())
  const [ editableEndDate, setEditableEndDate ] = useState(new Date())
  const [ editableEventPhoto, setEditableEventPhoto ] = useState(null)

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

    // FILE HANDLING FOR LAWYER PHOTO
  const handleEditableFileUpload = (event) => {
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
      setEditablePhone(file)
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


  const handleEditableEventFileUpload = (event) => {
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
      setEditableEventPhoto(file);
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

   // SEARCH EVENTS
  async function searchAdmins() {
    const response = await fetch(`${base_url}/search-admin?username=${adminQuery}`, {
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
    setAdmins(data.admins);
    console.log('Search results:', data);
  }


  // FETCH ADMINS
  const fetchAdmins = async () => {
    try{
    const response = await fetch(`${base_url}/admins`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error('Error fetching admins:', response.statusText);
      return;
    }
    const data = await response.json();
    console.log('lawyers:', data);
    setAdmins(data.admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
  }
  };

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
    setLawyers(data.lawyers);
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

    event.preventDefault()
    // add validation for all fields must be filled
    if (!username || !email || !phone || !description || !photo || !membershipDate  || !address || !enrolmentNumber ||!fatherName ) {
      console.error('All fields are required');
      alert('All fields are required');
      return;
    }

    // phone number must be 10 digits long
    if (phone.length !== 10) {
      console.error('Phone number must be 10 digits long');
      alert('Phone number must be 10 digits long');
      return;
    }
    if (!/^\d+$/.test(phone)) {
      console.error('Phone number must be a valid number');
      alert('Phone number must be a valid number');
      return;
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      console.error('Email must be a valid email address');
      alert('Email must be a valid email address');
      return;
    }
    

    const formData = new FormData(); 
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('description', description);
    formData.append('photo', photo); 
    formData.append('fatherName', fatherName)
    formData.append('membership', membershipDate.toISOString()); // send as ISO string
    formData.append('address', address);
    formData.append('enrolmentNumber', enrolmentNumber);

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
    } else if (response.status === 403) {
      console.log("Limit reached: Only 20 photos allowed in carousels-1");
      setIsLoading(false);
      alert("Upload limit reached: Only 20 photos are allowed in carousel-1.");
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

 // DELETE LAWYER FROM BACKEND (OWNER ONLY)
   const deleteAdmin = async (id) => {
    const token = localStorage.getItem("token");

    setIsLoading(true)
    setOverlay(false)
    const response = await fetch(`${base_url}/admin/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("admin not found")
      setIsLoading(false)
      alert("admin not found")
    } else if (response.status === 403) {
      console.log("Unauthorized")
      setIsLoading(false)
      alert("unauthorized access!")
   } else if (response.status === 200) { 
      console.log("admin deleted")
      setIsLoading(false)
      alert("admin deleted")
      fetchAdmins()
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


  const editLawyer = async()=>{

    const formData = new FormData();
    if(!editableUsername){

    }
    formData.append('username', editableUsername);
    formData.append('email', editableEmail);
    formData.append('phone', editablePhone);
    formData.append('description', editableDescription);
    formData.append('photo', editablePhoto); 
    formData.append('fatherName', editableFatherName)
   // formData.append('membership', editableMembershipDate.toISOString()); // send as ISO string
    formData.append('address', editableAddress);
    formData.append('enrolmentNumber', editableEnrolmentNumber);

    setIsLoading(true)

    console.log(`${editableEmail}: ${overlayLawyerEmail}`)
    setEditableLawyerForm(false)
    setIsLoading(false)

    /* const response = await fetch(`${base_url}/lawyer/${overlayLawyerId}`, {
      method: 'PUT',
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
      setEditableUsername('')
      setEditableEmail('')
      setPhone('')
      setEditableDescription('')
      setEditablePhoto(null)
      fetchLawyers()
    }

    if (!response.ok) {
      console.error('Error creating user:', response.statusText);
    } */
  }

  const editEvent = async(id)=>{

  }


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

      {/* EDITABLE LAWYER FORM */}
      <AnimatePresence>
        {editableLawyerForm && (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setEditableLawyerForm(false)}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="relative bg-white max-w-xl w-full rounded-2xl shadow-lg p-6 space-y-4 overflow-y-auto max-h-[90vh]">

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setEditableLawyerForm(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Lawyer</h2>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={editableUsername}
              onChange={(e) => setEditableUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Father's Name"
              value={editableFatherName}
              onChange={(e) => setEditableFatherName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={editableEmail}
              onChange={(e) => setEditableEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={editablePhone}
              onChange={(e) => setEditablePhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <textarea
              placeholder="Description"
              value={editableDescription}
              onChange={(e) => setEditableDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={4}
            />
            <input
              type="text"
              placeholder="Address"
              value={editableAddress}
              onChange={(e) => setEditableAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Enrolment Number"
              value={editableEnrolmentNumber}
              onChange={(e) => setEditableEnrolmentNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {/* Photo Upload */}
            <label className="flex items-center justify-center w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-sm focus:shadow-md">
              Upload Photo
              <input type="file" onChange={handleEditableFileUpload} className="hidden" />
            </label>

            {/* Date Picker */}
            <input
              type="date"
              value={new Date()?.toISOString().split("T")[0]}
              onChange={(e) => setEditableMembershipDate(new Date(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setEditableLawyerForm(false)}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => editLawyer(overlayLawyerId)} // Your save logic here
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </>
        )}
      </AnimatePresence>
      
      {/* EDITABLE EVENT FORM */}
      <AnimatePresence>
        {editableEventForm && (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/50 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => setEditableEventForm(false)}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div className="relative bg-white max-w-xl w-full rounded-2xl shadow-lg p-6 space-y-4 overflow-y-auto sm:overflow-y-hidden max-h-[90vh]">

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            onClick={() => setEditableEventForm(false)}
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit Event</h2>

          {/* Input Fields */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Event Name"
              value={editableEventName}
              onChange={(e) => setEditableEventName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <input
              type="text"
              placeholder="Location"
              value={editableEventLocation}
              onChange={(e) => setEditableEventLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            <textarea
              placeholder="Event Description"
              value={editableEventDescription}
              onChange={(e) => setEditableEventDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
              rows={4}
            />

            {/* Start Date */}
            <input
              type="date"
              value={editableStartDate?.toISOString().split("T")[0]}
              onChange={(e) => setEditableStartDate(new Date(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {/* End Date */}
            <input
              type="date"
              value={editableEndDate?.toISOString().split("T")[0]}
              onChange={(e) => setEditableEndDate(new Date(e.target.value))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />

            {/* Photo Upload */}
            {/* Photo Upload */}
            <label className="flex items-center justify-center w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-sm focus:shadow-md">
              Upload Photo
              <input type="file" onChange={handleEditableEventFileUpload} className="hidden" />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={() => setEditableEventForm(false)}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSaveEvent()} // Your save function
              className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-900"
            >
              Save
            </button>
          </div>
        </div>
      </motion.div>
    </>
        )}
      </AnimatePresence>

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

                <button style={{ pointerEvents: "auto" }} onClick={() =>{ setOverlay(false); setEditableLawyerForm(true);  }} className="absolute top-4 right-24 text-gray-600 hover:text-gray-800 z-50">
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
                   {overlayLawyerAddress}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                  enrolment Number:  {overlayEnrolmentNumber}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    Membership status:  {new Date(overlayLawyerMembership) < new Date() ? ( <span className="text-red-500 font-semibold">Expired</span>) : <span className="text-green-600 font-semibold">Active</span> }
                  </p>
                  <p className="text-gray-700">
                   
                   {new Date(overlayLawyerMembership) < new Date() ? ( <span>Last Membership: </span>) : <span>Current membership till: </span> } {new Date(overlayLawyerMembership).toLocaleDateString('en-US', { weekday: 'long',month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                   Father's Name: {overlayFatherName}
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

                <button style={{ pointerEvents: "auto" }} onClick={() =>{ setOverlayEvent(false); setEditableEventForm(true) }} className="absolute top-4 right-24 text-gray-600 hover:text-gray-800 z-50">
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

      <div className="w-full flex justify-between items-center bg-gray-100 px-6 py-3 shadow">
        <span className="font-semibold text-gray-800">Welcome {adminUsername}</span>
        <button onClick={() => { localStorage.removeItem('token'); onLogout(); }} className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

        {/* SEARCH BAR FOR ADMIN */}
        <div className="relative w-4/5 my-4  flex flex-col items-center justify-center">      
          <input value={adminQuery} onChange={(e)=> { setAdminQuery(e.target.value); searchAdmins(); }} type="text" placeholder="Search Admins" className="w-full pl-12 pr-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
        </div>

      {/* TABLE FOR ADMINS */}
      <div className="flex flex-col justify-evenly items-center w-full sm:w-4/5 px-4 ">
      {/* A TABLE COMPONENT */}

      {admins.map((admin, index)=>{

        return (

        <div key={index} className="flex flex-row justify-evenly items-center p-4  w-full rounded-md">
          <div className="flex flex-row justify-start flex-wrap items-center py-2 w-full sm:w-4/5">
            
            <div className="flex flex-col justify-start items-center py-2 ml-4">
              <span className="text-black self-start font-semibold banner-text ">{admin.username}</span>
              <span className="text-gray-400 self-start font-semibold banner-text ">{admin.email}</span>
            </div>
          </div>
          <button className={`text-gray-700 text-sm hidden sm:block bg-gray-100 font-normal banner-text uppercase w-48 py-2 rounded-md text-center ${admin.type == "owner" ? "text-green-600" : "text-gray-700"}`}>{admin.type}</button>
          <FaTrash onClick={()=> deleteAdmin(admin._id)} className="text-red-600 hover:text-red-800 cursor-pointer duration-200 mx-6 hover:scale-105 transition-all shadow-sm hover:shadow-md" size={20} />
        </div>
        )
      })}

      </div>

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
          <div onClick={() => { setOverlayLawyerName(lawyer.username); setOverlayLawyerEmail(lawyer.email); setOverlayLawyerId(lawyer._id); setOverlayLawyerPhoto(lawyer.photo); setOverlayLawyerDescription(lawyer.description); setOverlayEnrolmentNumber(lawyer.enrolmentNumber); setOverlayLawyerAddress(lawyer.address); setOverlayFatherName(lawyer.fatherName); setOverlayLawyerMembership(lawyer.membership); setOverlay(true); }}  className="flex flex-row justify-start flex-wrap items-center py-2 w-full sm:w-4/5">
             {lawyer.photo ? ( <Image height={60} width={60} className="sm:rounded-md rounded-full h-10 w-10" src={lawyer.photo || "https://via.placeholder.com/60"} alt={lawyer.username || "Lawyer Image"} />) : ( <div className="w-[60px] h-[60px] bg-gray-300 rounded-md" />)}
            <div className="flex flex-col justify-start items-center py-2 ml-4">
              <span className="text-black self-start font-semibold banner-text ">{lawyer.username}</span>
              <span className="text-gray-400 self-start font-semibold banner-text ">{lawyer.email}</span>
            </div>
          </div>
          <button className="text-gray-700 text-sm hidden sm:block bg-gray-100 font-normal banner-text uppercase w-48 py-2 rounded-md text-center">{new Date(lawyer.membership) < new Date() ? ( <span className="text-red-500 font-semibold">Expired</span>) : <span className="text-green-600 font-semibold">Active</span> }</button>
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
        <form className="self-start flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl max-w-sm space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-2xl text-gray-800 font-bold mb-4 uppercase">Create New Lawyer</h2>
            <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} placeholder="Username" className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="text" value={fatherName} onChange={(e)=> setFatherName(e.target.value)} placeholder="Father's Name" className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <textarea value={description} onChange={(e)=> setDescription(e.target.value)} placeholder="Description" className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md"></textarea>
            
            <label className="flex items-center justify-center w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-sm focus:shadow-md">
              Upload Photo
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>

              <label className="block text-sm font-medium text-gray-700 ">Membership Date</label>
              <DatePicker selected={membershipDate} onChange={(date) => setMembershipDate(date)} className="border rounded px-2 py-1 mt-1 w-full text-black"  />

            
            <textarea type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
            <input type="text" value={enrolmentNumber} onChange={(e) => setEnrolmentNumber(e.target.value)} placeholder="Enter enrolment number"  className="w-full px-4 py-3 border border-zinc-300 rounded-md  focus:ring-2 focus:ring-black text-gray-700 placeholder-gray-600 focus:outline-none focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
        

            <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-zinc-800 focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">Create lawyer</button>
        </form>

        {/* LINKS FORM */}
        <form onSubmit={addLink} className=" self-start flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl max-w-sm space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">add important links</h2>
          <input type="text" value={linkTitle} onChange={(e)=> setLinkTitle(e.target.value)} placeholder="Title" className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={linkDescription} onChange={(e)=> setLinkDescription(e.target.value)} placeholder="description" className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={linkUrl} onChange={(e)=> setLinkUrl(e.target.value)} placeholder="Link" className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <select onChange={(e)=> setLinkType(e.target.value)} className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="photo">photo</option>
            <option value="hyperlink">hyperlink</option>
            <option value="pdf">PDF</option>
          </select>
          <select onChange={(e)=> setLinkCategory(e.target.value)} className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-md focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">
            <option value="carousels-1">Gallery Carousel 1</option>
            <option value="carousels-2">Gallery Carousel 2</option>
          </select>
          <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-zinc-800 focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">add link</button>
        </form>

        {/* EVENTS FORM */}
        <form onSubmit={postEvent} className="self-start flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-xl max-w-sm space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">create event</h2>
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="event name" className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="description" className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <input type="text" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="location" className="w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md" />
          <h3 className="w-full text-left text-gray-700 font-bold text-base mt-2 uppercase"> start date </h3>
          <DatePicker selected={startDate} className='w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md' onChange={(date) => setStartDate(date)} showTimeSelect dateFormat="Pp"  />
          <h3 className="w-full text-left text-gray-700 font-bold text-base mt-4 uppercase"> end date </h3>
          <DatePicker className='w-full text-black px-4 py-3 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md' selected={endDate} onChange={(date) => setEndDate(date)} showTimeSelect dateFormat="Pp"  />;
          <label className="flex items-center justify-center w-full p-3 mb-4 rounded-md border border-gray-300 bg-white text-gray-700 cursor-pointer hover:bg-gray-200 transition-all duration-300 shadow-sm focus:shadow-md">
              Upload Photo
              <input type="file" onChange={handleEventFileUpload} className="hidden" />
          </label>
          <button type="submit" className="w-full py-3 bg-black text-white font-semibold rounded-md hover:bg-zinc-800 focus:scale-105 transition-all duration-300 shadow-sm focus:shadow-md">Add Event</button>
        </form>

        </div>

        <div className="w-full my-4 flex flex-row items-center justify-center flex-wrap space-x-0 sm:space-x-20 space-y-10 sm:space-y-0 bg-gray-100 rounded-lg shadow-md p-6">
          <SignupForm />
        </div>

        <Gallery title={"Gallery Carousel 1"} category={"carousels-1"}  items={links} />
        <Gallery title={"Gallery Carousel 2"} category={"carousels-2"} items={links} />
        
        <Footer />
      
    </div>
  );
}
