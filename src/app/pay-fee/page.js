'use client';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function PayFee() {
  const [payData, setPayData] = useState({
    name: '',
    email: '',
    amount: '',
    purpose: '',
  });

  const [enrollID, setEnrollID] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState('');

  const handlePayChange = (e) => {
    setPayData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting payment:', payData);
    // Add payment logic here
  };

  const handleEnrollmentCheck = async (e) => {
    e.preventDefault();
    if (enrollID.trim() === 'VALID123') {
      setIsEnrolled(true);
      setEnrollStatus('Enrollment Found ✅');
    } else {
      setIsEnrolled(false);
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
        <div className="w-full max-w-2xl border border-gray-200 rounded-2xl shadow-sm p-8">
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
                  value={payData.name}
                  onChange={handlePayChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={payData.email}
                  onChange={handlePayChange}
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
                  onChange={handlePayChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Purpose</label>
                <input
                  type="text"
                  name="purpose"
                  value={payData.purpose}
                  onChange={handlePayChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="e.g., Membership Fee"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isEnrolled}
              className={`mt-4 w-full ${
                isEnrolled ? 'bg-blue-800 hover:bg-blue-900' : 'bg-gray-400 cursor-not-allowed'
              } text-white text-sm font-medium py-2.5 rounded-lg transition`}
            >
              {isEnrolled ? 'Pay Now' : 'Verify Enrollment to Proceed'}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
