import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const profile = await currentProfile();
  const { name } = await req.json();

  if (!profile) return new NextResponse("Unauthorized", { status: 401 });
  if (!name) return new NextResponse("Owner name missing", { status: 400 });

  try {
    const newOwner = await db.owner.create({
      data: {
        name: name,
      },
    });

    return NextResponse.json(newOwner);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const owners = await db.owner.findMany({});
    if (!owners) return new NextResponse("Internal Error", { status: 500 });
    console.log(owners);
    return NextResponse.json(owners);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
