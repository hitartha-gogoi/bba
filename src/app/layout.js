import { Geist, Geist_Mono, Sixtyfour_Convergence, Inter_Tight, Orbitron, Sacramento, Rob  } from "next/font/google";
import { AppProvider } from "@/context/context";

import "./globals.css";

export const metadata = {
  title: "Bar Association Bahadurgarh | Official Website",
  description: "Bar Association Bahadurgarh is the official body of legal practitioners under Jhajjar District Court, Haryana. Get updates, elections, members list, and legal announcements.",
  keywords: "Bar Association Bahadurgarh, Bahadurgarh lawyers, Jhajjar District Court, Haryana bar association, Indian bar council, court notice board, legal practitioners Bahadurgarh, court cases Bahadurgarh, court lawyers, bar association elections, court updates, law firm Bahadurgarh, BBA members, advocate directory, legal help Bahadurgarh, Haryana lawyers, legal services India, lawyer contact Bahadurgarh, legal notices, Bar Association Haryana, court room updates",
  authors: [{ name: "Sahil" }],
  openGraph: {
    title: "Bar Association Bahadurgarh",
    description: "Official portal for Bar Association Bahadurgarh — Elections, Members, Notices, and Legal Resources.",
    url: "https://bahadurgarh.com",
    type: "website",
    images: [
      {
        url: "/bab-logo.png",
        width: 500,
        height: 500,
        alt: "logo",
      },
    ],
  },
  twitter: {
    card: "/bab-logo.png",
    title: "Bar Association Bahadurgarh",
    description: "Official portal for Bar Association Bahadurgarh — Elections, Members, Notices, and Legal Resources.",
    images: ["/bab-logo.png"],
  },
  icons: {
    icon: "/bab-logo.png",
    shortcut: "/bab-logo.png",
    apple: "/bab-logo.png",
  },
};

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',  
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  subsets: ["latin"], 
});

const sixtyfourConvergence = Sixtyfour_Convergence({
  subsets: ["latin"],
  variable: "--font-sixtyfour-convergence",
});

const sacramento = Sacramento({
  weight: '400', // Regular weight for Sacramento
  subsets: ['latin'],
  variable: '--font-sacramento', // Custom CSS variable
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Add Google Fonts link in the <head> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Orbitron:wght@400..900&family=Sacramento&family=Sixtyfour+Convergence&display=swap" rel="stylesheet"></link>
        <link
          href="https://cdn.jsdelivr.net/npm/@fontsource/fredoka-one/index.css"
          rel="stylesheet"
        />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen`}
      >
         <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
