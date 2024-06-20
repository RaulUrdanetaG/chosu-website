import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

export default async function SetUpPage() {
  await initialProfile();

  return redirect(`/home`);
}
