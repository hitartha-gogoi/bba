import Vakalatnama from "./vakalatnama.jsx";

const base_url = "https://bba-backend.onrender.com";

export default async function VakalatnamaPage({ searchParams }){

  const phoneNumber= searchParams?.phoneNumber;
  const res = await fetch(`${base_url}/vakalatnamas?phoneNumber=${phoneNumber}`, { cache: "no-store" });
  const json = await res.json();

  return <Vakalatnama initialVakalatnama={json.vakalatnamas || []} />;

}