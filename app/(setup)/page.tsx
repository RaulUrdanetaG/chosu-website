import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function SetUpPage() {
  const profile = await initialProfile();

  return redirect(`/home`);
}
