"use client";

import { Owner } from "@prisma/client";
import NewLocationButton from "./new-location-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";

interface LocationSelectorProps {
  selectedOwner: string;
  owners: Owner[];
  type: "id" | "name";
  add: boolean;
  handleGroupChange: (value: string) => void;
}

export default function OwnerSelector({
  selectedOwner,
  owners,
  type,
  add,
  handleGroupChange,
}: LocationSelectorProps) {
  return (
    <div className="flex flex-col justify-between items-center gap-1">
      <div
        className={cn(
          type === "id" ? "space-y-2" : "flex flex-col items-center space-y-1"
        )}
      >
        <p
          className={cn(
            "flex items-center  font-medium mt-[3px]",
            type === "id" ? "text-[14px]" : "text-[11px]"
          )}
        >
          Dueño
        </p>
        <Select onValueChange={handleGroupChange} value={selectedOwner}>
          <SelectTrigger
            className={cn(
              "bg-zinc-100 ",
              type === "id" ? "w-[80px] h-[44px]" : "h-9 w-16"
            )}
          >
            <SelectValue className="bg-zinc-100" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {type === "id"
                ? owners.map((owner) => (
                    <SelectItem key={owner.id} value={owner.id}>
                      {owner.name}
                    </SelectItem>
                  ))
                : owners.map((owner) => (
                    <SelectItem key={owner.id} value={owner.name}>
                      {owner.name}
                    </SelectItem>
                  ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {add && <NewLocationButton />}
    </div>
  );
}
