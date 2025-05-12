'use client';
import { useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const pricingData = [
  {
    title: "1. Bar Welfare Fee",
    content: [
      "Rs 100/- + applicable tax per vakalatnama."
    ]
  },
  {
    title: "2. Subscription Fee",
    content: [
      "Rs 1270/- per year."
    ]
  },
  {
    title: "3. Miscellaneous Charges",
    content: [
      "Any other fee notified by the association may be included under the miscellaneous head."
    ]
  },
  {
    title: "4. Subject to Association Decisions",
    content: [
      "All fees and charges are subject to the decisions and orders of the Bar Association Bahadurgarh."
    ]
  }
];

export default function PricingPolicyPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar textColor="black" />

      <main className="flex flex-col px-4 sm:px-8 lg:px-32 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Pricing Policy
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
