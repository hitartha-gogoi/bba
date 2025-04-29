// app/admin/page.tsx
import Admin from "./admin"; // Note: no "use client" here

// This is a Server Component by default.  
// Fetch happens here—on the server—so HTML includes your data.
export default async function AdminPage() {
  const res = await fetch("http://localhost:8080/lawyers", { cache: "no-store" });
  const json = await res.json();

  return <Admin initialLawyers={json.users || []} />;
}
