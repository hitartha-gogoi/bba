"use client";

import React from "react";
import Script from "next/script";

const PayFee = () => {
  const loadRazorpay = () => {
    if (typeof window === "undefined" || !window.Razorpay) {
      alert("Razorpay SDK not loaded yet. Please try again in a moment.");
      return;
    }

    const options = {
      key: "rzp_test_ngx1siyaSSVYJ9", // 🔴 Use Razorpay Test Key ID
      amount: 50000, // 500 INR in paise
      currency: "INR",
      name: "Bahadurgar Bar Association",
      description: "Bar Association Membership Fee",
      image: "/logo.png",
      handler: function (response) {
        alert("Payment Success! ID: " + response.razorpay_payment_id);
      },

      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999",
      },

      notes: {
        product: "Bar association membership",
      },
      theme: {
        color: "#6366F1",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {/* Razorpay Script */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => console.log("Razorpay SDK Loaded")}
      />

      <div className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="bg-gray-50 p-8 rounded-3xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Pay ₹500</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Secure your MVP onboarding slot.
          </p>
          <button
            onClick={loadRazorpay}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition"
          >
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
};

export default PayFee;
