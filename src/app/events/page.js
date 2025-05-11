import Event from "./events.jsx"; // Note: no "use client" here

const base_url = "https://bba-backend.onrender.com";

// This is a Server Component by default.  
// Fetch happens here—on the server—so HTML includes your data.

export default async function EventPage() {
  const res = await fetch(`${base_url}/events`, { cache: "no-store" });
  const json = await res.json();

  return <Event initialEvents={json.events || []}  />;
}
