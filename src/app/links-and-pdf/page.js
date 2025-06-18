import LinksAndPDF from "./links-and-pdfs.jsx";

const base_url = "https://bba-backend.onrender.com";

export default async function LinksAndPDFPage({ searchParams }){

  const phoneNumber = searchParams?.phoneNumber;
  const res = await fetch(`${base_url}/links-and-pdf`, { cache: "no-store" });
  const json = await res.json();

  return <LinksAndPDF initialLinks={json.links || []}  />;
}