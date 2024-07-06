import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Owner } from "@prisma/client";
import NewLocationButton from "./new-location-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    <div className="flex flex-col justify-between gap-1">
      <div className="space-y-2">
        <p className="flex items-center text-[14px] font-medium mt-[3px]">
          Dueño
        </p>
        <Select onValueChange={handleGroupChange} value={selectedOwner}>
          <SelectTrigger className="bg-zinc-100 w-[80px] h-[44px]">
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
