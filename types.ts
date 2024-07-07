import { Item, Owner, Tag, Location } from "@prisma/client";

export type DashItemType = Item & {
  owner: Owner;
  location: Location;
  tags: Tag[];
};
