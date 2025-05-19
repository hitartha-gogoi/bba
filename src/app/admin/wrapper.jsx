'use client';
import { useEffect, useState } from 'react';
import Admin from './admin';
import Login from './login';

const base_url = 'https://bba-backend.onrender.com';

export default function AdminWrapper() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const fetchData = async () => {
      try {
        const [lawyerRes, eventRes, linkRes, AdminRes] = await Promise.all([
          fetch(`${base_url}/lawyers`),
          fetch(`${base_url}/events`),
          fetch(`${base_url}/links`),
          fetch(`${base_url}/admins`),
        ]);

        const [lawyerJson, eventJson, linkJson, adminJson ] = await Promise.all([
          lawyerRes.json(),
          eventRes.json(),
          linkRes.json(),
          AdminRes.json()
        ]);

        setData({
          lawyers: lawyerJson.lawyers || [],
          events: eventJson.events || [],
          links: linkJson.links || [],
          admins: adminJson.admins || []
        });
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      setToken(null);
      setLoading(false);
      return;
    } 

    setToken(storedToken);
    fetchData();

  }, []);

  const handleLogin = (jwtToken, name, mail, id, role) => {
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('name', name);
    localStorage.setItem('email', mail);
    localStorage.setItem('id', id);
    localStorage.setItem('role', role);
    setToken(jwtToken);
    setLoading(true);
    fetchData();
  };

  const handleLogout = () => {
    setToken(null);
    setData(null);
    setLoading(false);
  };

  
  if (loading) return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50 z-50">
          <div className="loader">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            <p className="text-gray-700 mt-4">Loading...</p>
            
          </div>
        </div>
      );

    
  if (!token || !data) return <Login onLogin={handleLogin} />; 


  return (
    <Admin
      initialLawyers={data.lawyers || []}
      initialEvents={data.events || []}
      initialLinks={data.links || []}
      initialAdmins={data.admins || []}
      onLogout={handleLogout}
    />
  );
}
