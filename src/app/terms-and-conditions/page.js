'use client';
import { useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const termsData = [
  { title: "1. Acceptance of Terms", content: ` By accessing or using the Bar Association Bahadurgarh  ("the Website"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these Terms and Conditions, please do not use the Website.` },
  { title: "2. Changes to Terms", content: "Bar Association Bahadurgarh reserves the right to modify, amend, or update these Terms and Conditions at any time without prior notice. Any changes will be effective immediately upon posting. Your continued use of the Website following the posting of changes constitutes your acceptance of those changes." },
  { title: "3. Use of the Website", content: "You agree to use the Website for lawful purposes only and in compliance with all applicable laws and regulations. You shall not engage in any activity that may interfere with or disrupt the functioning of the Website or its associated services." },
  { title: "4. User Accounts", content: " If the Website offers user account registration, you are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and up-to-date information when creating your account and to update your information promptly if it changes." },
  { title: "5. Intellectual Property", content: "The content and materials on the Website, including but not limited to text, graphics, images, logos, videos, and software, are the property of Bar Association Bahadurgarh or its licensors and are protected by copyright and other intellectual property laws. You may not use, reproduce, distribute, or display any of the content on the Website without the prior written consent of Bar Association Bahadurgarh." },
  { title: "6. Privacy", content: 'Your use of the Website is also governed by our Privacy Policy, which can be found on the Website. By using the Website, you consent to the collection and use of your information in accordance with the Privacy Policy.', link: "/privacy" },
  { title: "7. Links to Third-Party Websites", content: "The Website may contain links to third-party websites or services. Bar Association Bahadurgarh is not responsible for the content, privacy practices, or availability of such third-party websites. Your use of third-party websites is at your own risk." },
  { title: "8. Disclaimer of Warranties", content: `The Website and its content are provided "as is" and "as available" without any warranties of any kind, whether express or implied. Bar Association Bahadurgarh makes no representations or warranties regarding the accuracy, completeness, or suitability of the content on the Website.` },
  { title: "9. Limitation of Liability", content: " To the extent permitted by law, Bar Association Bahadurgarh shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the Website." },
  { title: "10. Termination", content: "Bar Association Bahadurgarh reserves the right to terminate or suspend your access to the Website at its sole discretion, without notice, for any reason, including but not limited to violations of these Terms and Conditions." },
  { title: "11. Governing Law", content: "These Terms and Conditions shall be governed by and construed in accordance with the laws of the state of Haryana, India, without regard to its conflict of law principles." },
  { title: "12. Contact Information", content: "For questions, contact us at: Bar Association Bahadurgarh" },
];

export default function TermsPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar textColor="black" />

      <main className="flex flex-col px-4 sm:px-8 lg:px-32 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Terms & Conditions
        </h1>

        <div className="space-y-4">
          {termsData.map((section, index) => (
            <div key={index} className="border-b pb-4">
              <button
                onClick={() => toggleSection(index)}
                className="w-full text-left text-lg font-medium flex justify-between items-center hover:text-blue-600 transition-colors"
              >
                {section.title}
                <span className="text-xl">{openSection === index ? '-' : '+'}</span>
              </button>

              {openSection === index && (
                <div className="mt-2 text-sm sm:text-base text-gray-700">
                  {section.link ? (
                    <a href={section.link} className="text-blue-600 underline">{section.content}</a>
                  ) : (
                    <p>{section.content}</p>
                  )}
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
