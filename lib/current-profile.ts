import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function currentProfile() {
  const { userId } = auth();

  if (!userId) return null;

  const profile = await db.user.findUnique({
    where: {
      userId,
    },
  });

  return profile;
}
