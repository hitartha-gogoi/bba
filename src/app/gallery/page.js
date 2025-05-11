import GalleryPage from "./gallery.jsx";

const base_url = "http://localhost:8080";

export default async function GallerySite(){
  const res = await fetch(`${base_url}/links`, { cache: "no-store" });
  const json = await res.json();

  return <GalleryPage initialLinks={json.links || []} />;

}