'use client';
import Link from "next/link"
import { useEffect, useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from 'next/navigation';
import { MdContentCopy } from "react-icons/md";

export default function LinksAndPDF({ initialLinks }) {
  const [links, setLinks] = useState(initialLinks);
  const router = useRouter()

  useEffect(() => {
    console.log('Loaded links:', links);
  }, [links]);

  const handleDownload = (url, title) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.pdf`; // Suggested filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

    //truncate text
  const truncateText = (text, length) => {
    if (text.length <= length) return text;
    return text.slice(0, length) + '...';
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar textColor="black" />

      <main className="flex-1 w-full px-6 py-20 flex flex-col items-center bg-white text-black">

        <div className="w-full max-w-4xl">
          {links.length == 0 ? <h1 className="text-3xl font-bold mb-10 text-center">No Announcements and notices!</h1> :
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Announcements and Notices</h2>
          }
          <div className="divide-y divide-gray-300">
          
            {links.filter(item => item.type === "hyperlink").map((item, idx) => (
              <div key={item._id} className="py-4">
                <p className="text-xl font-semibold">{item.title}</p>
                <p className="flex text-gray-400 self-start font-semibold banner-text">{truncateText(item.link, 22)} 
                    <button onClick={() => { navigator.clipboard.writeText(item.link); alert("Copied!");}}  className="flex items-center gap-2 p-2 hover:text-blue-600 transition">
                        <MdContentCopy className='text-gray-600' size={20} />
                    </button>
                </p>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p><button
                  onClick={()=> router.push(`${item.link}`)}
                  className="text-blue-600 underline text-sm mt-1 inline-block"
                >
                  view link
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
