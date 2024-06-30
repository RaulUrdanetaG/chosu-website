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
    const existingTag = await db.tag.findFirst({
      where: {
        name: newName,
      },
    });

    if (existingTag) return NextResponse.json({ exists: "already exists" });

    const newTag = await db.tag.create({
      data: {
        name: newName,
      },
    });

    return NextResponse.json(newTag);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const tags = await db.tag.findMany({
      orderBy: {
        name: "asc",
      },
    });
    if (!tags) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json(tags);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
