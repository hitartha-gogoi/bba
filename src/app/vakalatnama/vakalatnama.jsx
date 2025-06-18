'use client';
import Link from "next/link"
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useSearchParams } from 'next/navigation';

export default function Vakalatnama({ initialVakalatnama, initialLatestPayment }) {
  const [vakalatnamas, setVakalatnamas] = useState(initialVakalatnama);
  const [ latestPayment, setLatestPayment ] = useState(initialLatestPayment)
  const searchParams = useSearchParams();
  const paymentDisplay = searchParams.get('paymentdisplay');

  useEffect(() => {
    console.log('Loaded Vakalatnamas:', vakalatnamas);
    console.log("Latest Payment: ", initialLatestPayment)
  }, [vakalatnamas]);

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


        {paymentDisplay === 'true' ?
        (<>
        <h1 className="text-3xl font-bold mb-10 text-center">Your Vakalatnamas</h1>
        {!latestPayment ? <h1 className="text-3xl font-bold mb-10 text-center">No Vakalatnamas Found!</h1> :
        (
          <>
        {latestPayment.status == true ?(
          <div className="w-full max-w-3xl bg-green-100 text-green-800 rounded-xl shadow-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-2">Payment Successful</h2>
            <p>Thank you!</p>
            
            {latestPayment.type == "vakalatnama" ?
            <>
            <button onClick={()=> handleDownload(latestPayment.pdf, "latest-vakalatnama")} className="inline-block mt-4 bg-white text-blue-800 font-semibold px-5 py-2 rounded hover:bg-gray-200 transition">
              Download latest vakalatnama
            </button>
            <button onClick={()=> handleDownload(latestPayment.receipt, 'receipt')} className="inline-block mt-4 bg-white text-blue-800 font-semibold px-5 py-2 rounded hover:bg-gray-200 transition mx-4">
              Download Receipt
            </button>
            </>
            :
            <>
            <p>Your membership has been extended!</p>
            <button onClick={()=> handleDownload(latestPayment.receipt, "membership-renewal-receipt")} className="inline-block mt-4 bg-white text-blue-800 font-semibold px-5 py-2 rounded hover:bg-gray-200 transition">
              Download Receipt
            </button>
            </>
            }
          </div>)
        :
          <div className="w-full max-w-3xl bg-yellow-100 text-yellow-800 rounded-xl shadow-lg p-6 mb-10">
            <h2 className="text-xl font-semibold mb-2">Failed Payment</h2>
            <p>Please try again later.</p>

            <Link href="/pay-fee">Retry Payment</Link>
          </div>
        }
        </>)
      }
        </>) : <div />}

        <div className="w-full max-w-4xl">
          {vakalatnamas.length == 0 ? <h1 className="text-3xl font-bold mb-10 text-center">No Vakalatnamas Found!</h1> :
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Previous Vakalatnamas</h2>
          }
          <div className="divide-y divide-gray-300">
          
            {vakalatnamas.map((item, idx) => (
              <div key={item._id} className="py-4">
                <p className="text-lg font-medium">{item.caseTitle} </p>

                <p className="text-lg font-medium">payment status: {item.status == true ? <span className="text-green-500">Successful</span> : <span className="text-red-500">failed</span>} </p>
                <p className="text-lg font-medium">payment id: {item.paymentId} </p>
                <p className="text-lg font-medium">transaction id: {item.transactionId} </p>
                <p className="text-sm text-gray-600">Appeal No: {item.appealNumber} | Court: {item.courtName}</p>
                <p className="text-sm text-gray-500">Paid ₹{item.fee} | {new Date(item.timestamp).toLocaleString()}</p>
                <button
                  onClick={()=> handleDownload(item.pdf, "vakalatnama")}
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  View Vakalatnama
                </button>
                <p><button
                  onClick={()=> handleDownload(item.receipt, "vakalatnama-receipt")}
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
