// app/admin/page.tsx
import Admin from "./admin"; // Note: no "use client" here

const base_url = "https://bba-backend.onrender.com";

// This is a Server Component by default.  
// Fetch happens here—on the server—so HTML includes your data.
export default async function AdminPage() {
  const res = await fetch(`${base_url}/lawyers`, { cache: "no-store" });
  const json = await res.json();

  const fetchEvent = await fetch(`${base_url}/events`, { cache: "no-store" });
  const eventJson = await fetchEvent.json();

  const fetchLink = await fetch(`${base_url}/links`, { cache: "no-store" });
  const linkJson = await fetchLink.json();

  return <Admin initialLawyers={json.users || []} initialEvents={eventJson.events || []} initialLinks={linkJson.links || []} />;
}
