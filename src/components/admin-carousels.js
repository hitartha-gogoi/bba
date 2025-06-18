"use client"; 

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronsRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, Pencil } from 'lucide-react';
import { FiPlus } from 'react-icons/fi'

const Gallery = ({ title, category, items, refresh }) => {

  const [overlay, setOverlay] = useState(false);
  const [ overlayGalleryPhoto, setOverlayGalleryPhoto ] = useState('')  

  const loggedIn = localStorage.getItem("token")
  const adminUsername = localStorage.getItem('name')
  const adminEmail = localStorage.getItem('email')
  const [ galleryImageId, setGalleryImageId ] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null)
  ;

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  

  //http://localhost:8080

  const base_url = "https://api.babahadurgarh.com"

  // NOTIFY ACTION TO ADMIN
  const notifyActionToAdmin = async (action)=>{

    const response = await fetch(`${base_url}/handle-action`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        actionHandler: adminUsername,
        action: action,
        email: adminEmail
      })
    })

    if (!response.ok) {
      console.error('Error sending action:', response.statusText);
      return;
    }
    const data = await response.json();
    console.log('Action sent successfully:', data);
  }


    // FILE HANDLING FOR GALLERY PHOTO
  const handleGalleryFileUpload = async(Image) => {
    const file = Image.target.files[0];

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
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', `Gallery Photo for ${category}, item no: ${items.length + 1}`);
      formData.append('description', `Gallery Photo for ${category}`);
      formData.append('category', category);
      formData.append('type', "photo");

      setIsLoading(true);

    const response = await fetch(`${base_url}/gallery`, {
      method: 'POST',
      body: formData,
    });

    if(response.status === 403) {
      console.log("Limit reached: Only 20 photos allowed in carousels")
      alert("Limit reached: Only 20 photos allowed in carousels")
      setIsLoading(false)
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("Image not found")
      setIsLoading(false)
      alert("Image not found")
    } else if (response.status === 200) { 
      console.log("Image created")
      setIsLoading(false)
      notifyActionToAdmin(`Created a new gallery photo for ${category}`)
      alert("Image created")
      refresh()
    }

    if (!response.ok) {
      setOverlay(false)
      setIsLoading(false)
      console.error('Error creating Image:', response.statusText);
    }

    }
  };

  const deleteImage = async () => {
    setIsLoading(true)
    setOverlay(false)
    const response = await fetch(`${base_url}/gallery/${galleryImageId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("Image not found")
      setIsLoading(false)
      alert("Image not found")
    } else if (response.status === 500) {
      console.log("error")
      setIsLoading(false)
      alert("error")
    } else if (response.status === 404) {
      console.log("Image not found")
      setIsLoading(false)
      alert("Image not found")
    } else if (response.status === 200) { 
      console.log("Image deleted")
      setIsLoading(false)
      notifyActionToAdmin(`Deleted a gallery photo for ${category}`)
      setOverlayGalleryPhoto('')
      alert("Image deleted")
      setIsLoading(false)
      setOverlay(false)
      refresh()
    }

    if (!response.ok) {
      console.error('Error deleting lawyer:', response.statusText);
    }
  };

  useEffect(()=>{
    const filteredItems = items.filter(item => item.category === category);
    console.log(filteredItems, items)
  },[])

  

  const filteredItems = items.filter(item => item.category === category);

  return (
    <div className="w-full py-6 px-4">

        {/* CIRCLE LOADING ANIMATION */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="loader">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="text-gray-700 mt-4">Loading...</p>
            
          </div>
        </div>
      )}

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
                      <button style={{ pointerImages: "auto" }} onClick={() => setOverlay(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 z-50">
                        X
                      </button>
                      <Trash2 style={{ pointerImages: "auto" }} onClick={deleteImage} className="absolute top-4 right-10 text-gray-600 hover:text-gray-800 z-50" />
                      

                      {/* large image */}
                      <div className="w-full h-80 relative">
                        <Image
                          src={overlayGalleryPhoto || "https://via.placeholder.com/300" } // default image if no photo is available
                          alt="Gallery Image"
                          layout="fill"
                          objectFit="contain"
                          className="w-4/5 h-96 object-contain"
                        />
                      </div>
      
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            
      <div className="flex justify-between w-full items-center mb-4">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 banner-text">{title}</h2>
      {/* arrow right chevron double in react-icons library */}
      <div className="flex items-center">
                      
        {/* Hidden file input */}
            <input type="file" ref={fileInputRef} onChange={handleGalleryFileUpload} className="hidden"  /> 
            {/* Plus Icon (Clickable) */}
            <button  onClick={handleIconClick} className="text-2xl text-blue-600 hover:text-blue-800" title="Upload File">
            <FiPlus />
            </button>
      </div>  
      
        
      </div>

      <div className="flex overflow-x-auto no-scrollbar space-x-4">
        {filteredItems.map((item, index) => (
          <motion.div
            key={index}
            className="min-w-[160px] sm:min-w-[200px] md:min-w-[240px] h-[160px] sm:h-[200px] md:h-[260px] bg-gray-900 rounded-xl overflow-hidden shadow-md flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.3 }}
          >
            {item.type == "photo" ? 
            <Image
              src={item.link || "https://via.placeholder.com/300"}
              onClick={()=> {  setOverlayGalleryPhoto(item.link); setGalleryImageId(item._id); setOverlay(true); }}
              alt={`Gallery Item ${index + 1}`}
              width={240}
              height={260}
              className="object-cover w-full h-full"
            /> : <div />
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
