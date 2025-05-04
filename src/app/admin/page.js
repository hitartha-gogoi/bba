// app/admin/page.tsx
import Admin from "./admin"; // Note: no "use client" here

const base_url = "http://localhost:8080";

// This is a Server Component by default.  
// Fetch happens here—on the server—so HTML includes your data.
export default async function AdminPage() {
  const res = await fetch(`${base_url}/lawyers`, { cache: "no-store" });
  const json = await res.json();

  return <Admin initialLawyers={json.users || []} />;
}
