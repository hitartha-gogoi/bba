'use client';
import { useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const pricingData = [
  {
    title: "1. Return and Refunds Policy",
    content: [
      "Return and Refunds are subject to the conditions laid down by the Bar Association Bahadurgarh."
    ]
  },
  {
    title: "2. Approval Requirement",
    content: [
      "For any refund of amount, a prior approval of the Secretary, Bar Association Bahadurgarh is necessary."
    ]
  },
  {
    title: "3. Refund Timeline",
    content: [
      "Refund request must be made within 24 hours of payment made."
    ]
  },
  {
    title: "4. Conditions Apply",
    content: [
      "All conditions are subject to the rules and regulations laid down by the Bar Association Bahadurgarh through office orders, memos, or any other mode deemed fit by the association."
    ]
  }
];

export default function RefundReturnShippingPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar textColor="black" />

      <main className="flex flex-col px-4 sm:px-8 lg:px-32 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Return / Refund / Shipping Policy
        </h1>

        <div className="space-y-4">
          {pricingData.map((section, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggleSection(index)}
                className="w-full text-left text-lg font-medium flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                {section.title}
                <span className="text-xl">{openSection === index ? '-' : '+'}</span>
              </button>

              {openSection === index && (
                <div className="mt-2 text-sm sm:text-base text-gray-700 space-y-2">
                  {section.content.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
