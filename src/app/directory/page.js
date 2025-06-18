import Directory from "./directory.jsx";

const base_url = "https://api.babahadurgarh.com";

export default async function DirectoryPage(){
  const res = await fetch(`${base_url}/lawyers`, { cache: "no-store" });
  const json = await res.json();

  return <Directory initialLawyers={json.lawyers || []} />;

}