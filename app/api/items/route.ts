import { checkAdmin } from "@/lib/check-admin";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface itemDataProps {
  values: {
    name: string;
    description: string;
    price: number;
    boughtAt: number;
    owner: string;
  };
  imageLinks: string[];
  tags: string[];
  location: string;
}

export async function POST(req: Request) {
  const admin = await checkAdmin();
  const itemData: itemDataProps = await req.json();

  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  if (!itemData)
    return new NextResponse("Form values missing", { status: 400 });

  try {
    const newItem = {
      name: itemData.values.name,
      price: itemData.values.price,
      boughtAt: itemData.values.boughtAt,
      description: itemData.values.description,
      imgUrls: itemData.imageLinks,
      owner: itemData.values.owner, // Asegúrate de proporcionar el ID del propietario
      location: itemData.location,
      tags: itemData.tags, // Asegúrate de proporcionar la ubicación
    };

    console.log(newItem);
    // await db.item.create({
    //   data: newItem,
    // });
    return new NextResponse("succes", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
