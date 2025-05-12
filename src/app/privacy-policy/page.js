'use client';
import { useState } from 'react';
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const privacyData = [
  {
    title: "1. Information We Collect",
    content: [
      "1.1. Personal Information You Provide: We may collect personal information you provide to us, such as your name, contact details (email address, phone number, postal address), professional credentials, and other information when you interact with our website, register for events, or become a member.",
      "1.2. Log Data: When you visit our website, our servers automatically record information, including your IP address, browser type, referring URL, and other technical data.",
      "1.3. Cookies and Similar Technologies: We use cookies and similar technologies to collect information about your browsing activities on our website. You can manage your cookie preferences through your web browser settings."
    ]
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "2.1. Providing Services: To provide you with our services, including event registration, membership management, and communication.",
      "2.2. Communication: To communicate with you about our events, services, updates, and other information related to Bar Association Bahadurgarh.",
      "2.3. Legal Obligations: To comply with legal and regulatory requirements.",
      "2.4. Marketing: With your consent, we may use your information to send you promotional materials or newsletters."
    ]
  },
  {
    title: "3. How We Share Your Information",
    content: [
      "3.1. Service Providers: We may share your information with third-party service providers who assist us in providing our services.",
      "3.2. Legal Compliance: We may disclose your information when required by law or in response to valid legal requests.",
      "3.3. Consent: We may share your information with your consent or at your direction."
    ]
  },
  {
    title: "4. Your Choices",
    content: [
      "4.1. Access and Correction: You have the right to access and update your personal information. You can do this by contacting us using the information provided below.",
      "4.2. Marketing Preferences: You can opt out of receiving marketing communications from us by following the unsubscribe instructions provided in our emails."
    ]
  },
  {
    title: "5. Security",
    content: [
      "We take reasonable measures to protect your personal information. However, no method of transmission over the internet or electronic storage is entirely secure. We cannot guarantee the security of your data."
    ]
  },
  {
    title: "6. Changes to this Privacy Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will post the updated Privacy Policy on our website, and the revised version will be effective as of the date posted."
    ]
  },
  {
    title: "7. Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at:",
      "Bar Association Bahadurgarh",
      "Civil Court Complex, Balou Road",
      "Bahadurgarh, 124507, Haryana",
      "bahadurgarhbarassociation@gmail.com"
    ]
  },
  {
    title: "8. Effective Date & Consent",
    content: [
      "Effective Date: 3/10/2023",
      "By using Bar Association Bahadurgarh services or interacting with our website, you consent to the practices described in this Privacy Policy.",
      "Bar Association Bahadurgarh reserves all rights in the event of any conflict or inconsistency between this Privacy Policy and applicable law."
    ]
  }
];

export default function PrivacyPage() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar textColor="black" />

      <main className="flex flex-col px-4 sm:px-8 lg:px-32 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
          Privacy Policy
        </h1>

        <div className="space-y-4">
          {privacyData.map((section, index) => (
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
