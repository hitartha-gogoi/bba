'use client';
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Vakalatnama({ initialVakalatnama = [] }) {
  const [vakalatnamas, setVakalatnamas] = useState(initialVakalatnama);

  useEffect(() => {
    console.log('Loaded Vakalatnamas:', vakalatnamas);
  }, [vakalatnamas]);

  const latest = vakalatnamas?.[0];

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "vakalatnama.pdf"; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar textColor="black" />

      <main className="flex-1 w-full px-6 py-20 flex flex-col items-center bg-white text-black">

        <h1 className="text-3xl font-bold mb-10 text-center">Your Vakalatnamas</h1>

        {latest && (
          <div className="w-full max-w-3xl bg-blue-800 text-white rounded-xl shadow-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-2">Latest Vakalatnama</h2>
            <p><strong>Appeal:</strong> {latest.appealNumber}</p>
            <p><strong>Case:</strong> {latest.caseTitle}</p>
            <p><strong>Versus:</strong> {latest.versus}</p>
            <p><strong>Fee:</strong> ₹{latest.fee}</p>
            <button
              onClick={()=> handleDownload(latest.pdf)}
              className="inline-block mt-4 bg-white text-blue-800 font-semibold px-5 py-2 rounded hover:bg-gray-200 transition"
            >
              Download PDF
            </button>
          </div>
        )}

        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Previous Vakalatnamas</h2>
          <div className="divide-y divide-gray-300">
            {vakalatnamas.slice(1).map((item, idx) => (
              <div key={item._id} className="py-4">
                <p className="text-lg font-medium">{item.caseTitle} </p>
                <p className="text-sm text-gray-600">Appeal No: {item.appealNumber} | Court: {item.courtName}</p>
                <p className="text-sm text-gray-500">Paid ₹{item.fee} | {new Date(item.timestamp).toLocaleString()}</p>
                <button
                  onClick={()=> handleDownload(item.pdf)}
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  View PDF
                </button>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
