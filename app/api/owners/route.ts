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
    const existingOwner = await db.owner.findFirst({
      where: {
        name: newName,
      },
    });

    if (existingOwner) return NextResponse.json({ exists: "already exists" });

    const newOwner = await db.owner.create({
      data: {
        name: newName,
      },
    });

    return NextResponse.json(newOwner);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const owners = await db.owner.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (!owners) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json(owners);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
