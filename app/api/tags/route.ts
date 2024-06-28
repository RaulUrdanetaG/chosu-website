import { checkAdmin } from "@/lib/check-admin";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const admin = await checkAdmin();
  const { name } = await req.json();

  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  if (!name) return new NextResponse("Owner name missing", { status: 400 });

  try {
    const newTag = await db.tag.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(newTag);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const tags = await db.tag.findMany({});
    if (!tags) return new NextResponse("Internal Error", { status: 500 });

    return NextResponse.json(tags);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
