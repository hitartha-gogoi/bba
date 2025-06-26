'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';
import { useBaseURL } from '@/context/context';

export default function PayFee() {

  const base_url = useBaseURL();

  const router = useRouter()

  const [payData, setPayData] = useState({
    name: '',
    email: '',
    amount: 101,
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [pdfLink, setPdfLink] = useState(null);
  const [ caseTitle, setCaseTitle ] = useState("")
  const [ courtName, setCourtName ] = useState("")
  const [ appealNumber, setAppealNumber ] = useState("")
  const [ paymentType, setPaymentType ] = useState("vakalatnama")
  const [ representing, setRepresenting ] = useState("")
  const [ versus, setVersus ] = useState("")
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [enrollID, setEnrollID] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState('');


  const handlePaySubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting payment:', payData);
    setLoading(true);

    const vakalatnamaForm = {
        amount: payData.amount,
        name: payData.name,
        email: payData.email,
        phoneNumber: payData.phoneNumber,
        enrolmentId: enrollID,
        paymentType: "vakalatnama",
        caseTitle, courtName,  appealNumber, representing, versus
    }

    const membershipForm = {
        amount: payData.amount,
        name: payData.name,
        email: payData.email,
        phoneNumber: payData.phoneNumber,
        enrolmentId: enrollID,
        paymentType: "membership",
    }

    const bodyData = paymentType === "membership" ? JSON.stringify(membershipForm) : JSON.stringify(vakalatnamaForm);
    console.log(bodyData)
    const response = await fetch(`${base_url}/create-payment-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyData
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert('Failed to initiate payment');
    }

    setLoading(false);
    // Add payment logic here
  };


  const handleEnrollment = async(type)=>{
    const response = await fetch(`${base_url}/enrolment?enrolmentId=${enrollID}`)
    const result = await response.json()

    const membershipExpiry = new Date(result.lawyer.membership);
    const today = new Date();
    const oneMonthFromToday = new Date();
    oneMonthFromToday.setMonth(today.getMonth() + 1);

    const isMembershipActive = membershipExpiry > today;
    const isExpiringSoon = membershipExpiry <= oneMonthFromToday && isMembershipActive;

    if (enrollID.trim() === result.enrolmentId) {
      console.log(isMembershipActive && type == "membership")

      if(isExpiringSoon && type == "membership"){
        setEnrollStatus('⚠️ Membership expiring soon. Pay your membership.');
        setIsEnrolled(true);
        setPayData(prev => ({ ...prev, name: result.lawyer.username, email: result.lawyer.email, phoneNumber: result.lawyer.phone }));
        return;
      } else if(isMembershipActive && type == "membership"){
        setEnrollStatus('Membership still active ❌');
        setIsEnrolled(false);
        setPayData(prev => ({ ...prev, name: result.lawyer.username, email: result.lawyer.email, phoneNumber: result.lawyer.phone }));
        return;
        
      } else if(type == "vakalatnama"){
        setIsEnrolled(true);
        setEnrollStatus('Enrollment Found ✅');
        setPayData(prev => ({ ...prev, name: result.lawyer.username, email: result.lawyer.email, phoneNumber: result.lawyer.phone }));
      }
    }
  }

  const handleEnrollmentCheck = async (e) => {
    e.preventDefault();

    const response = await fetch(`${base_url}/enrolment?enrolmentId=${enrollID}`)
    const result = await response.json()

    console.log(result.enrolmentId)

    if (enrollID.trim() === result.enrolmentId) {
      console.log(result.enrolmentId)
      if(new Date(result.lawyer.membership) > new Date() && paymentType == "membership"){
        setEnrollStatus('Membership still active ❌');
        setIsEnrolled(false);
        setPayData(prev => ({ ...prev, name: result.lawyer.username, email: result.lawyer.email, phoneNumber: result.lawyer.phone }));
        return;
      }
      setIsEnrolled(true);
      setEnrollStatus('Enrollment Found ✅');
      setPayData(prev => ({ ...prev, name: result.lawyer.username, email: result.lawyer.email, phoneNumber: result.lawyer.phone }));  
    } else {
      setIsEnrolled(false);
      setPayData(prev => ({ ...prev, name: "", email: "", phoneNumber: "" }));
      setPhoneNumberStatus('Lawyer Not Found ❌');
      setEnrollStatus('Enrollment Not Found ❌');
    }
  };

  const handleEnrollmentInputChange = (e) => {
    setEnrollID(e.target.value);
    setIsEnrolled(false); // Disable payment until reverified
    setEnrollStatus('');  // Clear status until next check
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar textColor="black" />

      <main className="flex-1 px-4 py-16 flex flex-col items-center justify-center space-y-16">
        
        {/* ✅ Check Enrollment */}
        <div className="w-full max-w-3xl border border-gray-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Check Enrollment</h2>
          <form onSubmit={handleEnrollmentCheck} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={enrollID}
              onChange={handleEnrollmentInputChange}
              placeholder="Enter Enrollment ID"
              required
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <button
              type="submit"
              className="bg-blue-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-blue-900 transition"
            >
              Check
            </button>
          </form>
          {enrollStatus && (
            <p className={`mt-4 text-sm ${isEnrolled ? 'text-green-600' : 'text-red-600'}`}>
              {enrollStatus}
            </p>
          )}

          {enrollStatus ?
              <>
            <label className="block text-sm mb-1 mt-2">Choose Payment or view Vakalatnamas</label>
              <div className="flex flex-wrap gap-3">
                 <button type="button"  onClick={() => { setPaymentType("vakalatnama"); handleEnrollment("vakalatnama"); setPayData(prev => ({ ...prev, amount: 101 })); }} className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                        paymentType === "vakalatnama" ? "bg-blue-800 text-white border-blue-800" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}>
                          Vakalatnama
                 </button>

                 <button type="button" onClick={() => { setPaymentType("membership"); handleEnrollment("membership"); setPayData(prev => ({ ...prev, amount: 1500 }));}}
                     className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${paymentType === "membership" ? "bg-blue-800 text-white border-blue-800" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}>
                     Membership
                </button>

                <button type="button" onClick={() => router.push(`/vakalatnama?phoneNumber=${payData.phoneNumber}&paymentdisplay=false`)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200`}>
                    View Vakalatnamas
                </button>
                <button type="button" onClick={() => router.push(`/membership-fees?phoneNumber=${payData.phoneNumber}`)} className={`px-4 py-2 rounded-lg text-sm font-medium border transition bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200`}>
                    View membership fees
                </button>
              </div>
              </>: <div />}
        </div>

        {/* ✅ Pay Fee Form */}
        <div className="w-full max-w-2xl border border-gray-200 rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-semibold mb-6">Pay Fee</h2>
          <form onSubmit={handlePaySubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  disabled={true}
                  value={payData.name}
                  placeholder="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  disabled={true}
                  value={payData.email}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={payData.amount}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  disabled={true}
                  name="phoneNumber"
                  value={payData.phoneNumber}
                  onChange={(e)=>{ setPayData(prev => ({ ...prev, ["phoneNumber"]: e.target.value })) }}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="Phone Number"
                />
               
              </div>

              
              {paymentType == "vakalatnama" ? 
              <>
              <div>
                <label className="block text-sm mb-1">Case Title</label>
                <input
                  type="text"
                  name="case title"
                  placeholder="case title"
                  value={caseTitle}
                  onChange={(e)=> setCaseTitle(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1"> In the Court of </label>
                <input
                  type="text"
                  name=" In the Court of"
                  placeholder="Court Name"
                  value={courtName}
                  onChange={(e)=> setCourtName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Case Number</label>
                <input
                  type="text"
                  placeholder="Appeal Number"
                  value={appealNumber}
                  onChange={(e)=> setAppealNumber(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Plaintiff</label>
                <input
                  type="text"
                  placeholder="Plaintiff"
                  value={representing}
                  onChange={(e)=> setRepresenting(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Defendant</label>
                <input
                  type="text"
                  placeholder="Defendant"
                  value={versus}
                  onChange={(e)=> setVersus(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              </>
              :
              <></>

              }
            </div>

            <div>
              
            </div>


            <button
              type="submit"
              disabled={!isEnrolled}
              className={`mt-4 w-full ${
                isEnrolled ? 'bg-blue-800 hover:bg-blue-900' : 'bg-gray-400 cursor-not-allowed'
              } text-white text-sm font-medium py-2.5 rounded-lg transition`}
            >
              {isEnrolled ? <span>{loading ? 'Redirecting...' : `Pay ${payData.amount} Now`}</span> : <span>Verify Enrollment to Proceed</span>}
            </button>
          </form>
        </div>

        {pdfLink ? (
        <div className="space-y-3">
          <p>✅ Payment successful for: {transactionInfo.name}</p>
          <p>Enrolment: {transactionInfo.enrolmentNumber}</p>
          <a
            href={pdfLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Download Vakalatnama PDF
          </a>
        </div>
      ) : (
       < p>{loading && ( <p className="text-sm text-gray-500 animate-pulse">Waiting for payment confirmation...</p>
        
       )}</p>
      )}
      </main>

      <Footer />
    </div>
  );
}
