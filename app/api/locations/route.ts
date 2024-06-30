import { checkAdmin } from "@/lib/check-admin";
import { db } from "@/lib/db";
import { capitalizeFirstLetter } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const admin = await checkAdmin();
  const { name } = await req.json();

  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  if (!name) return new NextResponse("Owner name missing", { status: 400 });

  const newName = capitalizeFirstLetter(name);

  try {
    const existingLocation = await db.location.findFirst({
      where: {
        name: newName,
      },
    });

    if (existingLocation)
      return NextResponse.json({ exists: "already exists" });

    const newLocation = await db.location.create({
      data: {
        name: newName,
      },
    });

    return NextResponse.json(newLocation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const locations = await db.location.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (!locations) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json(locations);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
