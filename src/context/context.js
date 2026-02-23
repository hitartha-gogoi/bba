"use client";

import { createContext, useContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Hook to use base_url from anywhere
export const useBaseURL = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useBaseURL must be used within AppProvider");
  return context.base_url;
};

// Main Provider
export const AppProvider = ({ children }) => {
  // Hardcoded or dynamic URL

  const LOCALHOST_URL = "http://localhost:8080"
  const PRODUCTION_URL =  "https://bba-backend.onrender.com"
   // "https://api.babahadurgarh.com"
  const [base_url] = useState(PRODUCTION_URL);

  return (
    <AppContext.Provider value={{ base_url }}>
      {children}
    </AppContext.Provider>
  );
};
