import { useFilter } from "@/hooks/use-filter";
import { checkAdmin } from "@/lib/check-admin";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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
  id?: string;
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

    await db.item.create({
      data: {
        name: newItem.name,
        price: newItem.price,
        boughtAt: newItem.boughtAt,
        description: newItem.description,
        imgUrls: newItem.imgUrls,
        ownerId: newItem.owner,
        locationId: newItem.location,
        tagsIds: newItem.tags,
      },
    });

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const admin = await checkAdmin();
  const itemData: itemDataProps = await req.json();

  if (!admin) return new NextResponse("Unauthorized", { status: 401 });
  if (!itemData)
    return new NextResponse("Form values missing", { status: 400 });
  if (!itemData.id) return new NextResponse("Item id missing", { status: 400 });

  try {
    const updateItem = {
      id: itemData.id,
      name: itemData.values.name,
      price: itemData.values.price,
      boughtAt: itemData.values.boughtAt,
      description: itemData.values.description,
      imgUrls: itemData.imageLinks,
      owner: itemData.values.owner,
      location: itemData.location,
      tags: itemData.tags,
    };

    await db.item.updateMany({
      where: {
        id: updateItem.id,
      },
      data: {
        name: updateItem.name,
        price: updateItem.price,
        boughtAt: updateItem.boughtAt,
        description: updateItem.description,
        imgUrls: updateItem.imgUrls,
        ownerId: updateItem.owner,
        locationId: updateItem.location,
        tagsIds: updateItem.tags,
      },
    });

    return new NextResponse("success", { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const filter = url.searchParams.get("q");
  const owner = url.searchParams.get("o");
  const location = url.searchParams.get("l");
  const tags = url.searchParams.get("t");

  const filters: any = {};

  if (location) {
    const locationRecord = await db.location.findFirst({
      where: { name: location as string },
    });
    if (locationRecord) {
      filters.locationId = locationRecord.id;
    }
  }

  if (tags) {
    const tagsArray = (tags as string).split(" ");
    const tagsRecords = await db.tag.findMany({
      where: {
        name: { in: tagsArray },
      },
    });
    const tagsIds = tagsRecords.map((tag) => tag.id);
    filters.tagsIds = { hasSome: tagsIds };
  }

  if (owner) {
    const ownerRecord = await db.owner.findFirst({
      where: {
        name: owner as string,
      },
    });
    if (ownerRecord) {
      filters.ownerId = ownerRecord.id;
    }
  }

  if (filter) {
    filters.name = {
      contains: filter as string,
      mode: "insensitive",
    };
  }

  try {
    const items = await db.item.findMany({
      where: filters,
      include: {
        location: true,
        Tags: true,
        owner: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (!items) return NextResponse.json({ message: "No items" });

    return NextResponse.json(items);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
