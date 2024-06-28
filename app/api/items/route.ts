import { checkAdmin } from "@/lib/check-admin";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface itemDataProps {
  values: {
    name: string;
    description: string;
    price: number;
    boughtAt: number;
  };
  imageLinks: string[];
}

export async function POST(req: Request) {
  const admin = await checkAdmin();
  const itemData: itemDataProps = await req.json();

  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  if (!itemData)
    return new NextResponse("Form values missing", { status: 400 });

  console.log(itemData.values.name);

  try {
    const newItem = {
      name: itemData.values.name,
      price: itemData.values.price,
      boughtAt: itemData.values.boughtAt,
      description: itemData.values.description,
      imgUrls: itemData.imageLinks,
      owner: "Owner ID", // Asegúrate de proporcionar el ID del propietario
      location: "Item Location", // Asegúrate de proporcionar la ubicación
    };
    await db.item.create({
      data: newItem,
    });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }

  console.log(itemData);
  console.log(itemData.imageLinks);
}
