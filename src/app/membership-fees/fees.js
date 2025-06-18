'use client';
import Link from "next/link"
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSearchParams } from 'next/navigation';

export default function MembershipFee({ initialMemberships, initialLatestPayment, initialLawyer }) {
  const [memberships, setMemberships] = useState(initialMemberships);
  const [ lawyer, setLawyer ] = useState(initialLawyer)

  useEffect(() => {
    console.log('Loaded memberships:', memberships);
    console.log("lawyer: ", initialLawyer)
  }, [memberships]);

  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.pdf`; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar textColor="black" />

      <main className="flex-1 w-full px-6 py-20 flex flex-col items-center bg-white text-black">

        <div className="w-full max-w-4xl">
          {memberships.length == 0 ? <h1 className="text-3xl font-bold mb-10 text-center">No memberships Found!</h1> :
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Previous memberships</h2>
          }
          <div className="divide-y divide-gray-300">
          
            {memberships.map((item, idx) => (
              <div key={item._id} className="py-4">
                <p className="text-lg font-medium">Your membership was extended till {
                 (() => {
                  const date = new Date(item.timestamp);
                  date.setFullYear(date.getFullYear() + 1); // Extend the year by 1
                  return date.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  })()
                  } </p>

                <p className="text-lg font-medium">payment status: {item.status == true ? <span className="text-green-500">Successful</span> : <span className="text-red-500">failed</span>} </p>
                <p className="text-lg font-medium">payment id: {item.paymentId} </p>
                <p className="text-lg font-medium">transaction id: {item.transactionId} </p>
                <p className="text-sm text-gray-500">Paid ₹{item.fee} | {new Date(item.timestamp).toLocaleString()}</p>
                <p><button
                  onClick={()=> handleDownload(item.receipt, "membership-receipt")}
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  View Receipt
                </button>
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
