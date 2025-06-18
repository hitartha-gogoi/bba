import MembershipFee from "./fees.js";

const base_url = "https://api.babahadurgarh.com";

export default async function MembershipFeePage({ searchParams }){

  const phoneNumber = searchParams?.phoneNumber;
  const res = await fetch(`${base_url}/membership-fees?phoneNumber=${phoneNumber}`, { cache: "no-store" });
  const json = await res.json();

  return <MembershipFee initialMemberships={json.memberships || []} initialLatestPayment={json.latestTransaction} initialLawyer={json.lawyer}  />;
}