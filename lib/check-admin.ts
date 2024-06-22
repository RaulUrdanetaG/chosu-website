import { currentProfile } from "./current-profile";

export async function checkAdmin() {
  const profile = await currentProfile();

  if (!profile) return null;

  if (profile.role !== "ADMIN") return null;

  return profile;
}
