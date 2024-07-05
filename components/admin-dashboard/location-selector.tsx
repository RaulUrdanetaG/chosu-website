import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Location } from "@prisma/client";
import NewLocationButton from "./new-location-button";

interface LocationSelectorProps {
  selectedLocation: string;
  locations: Location[];
  type: "id" | "name";
  add: boolean;
  handleGroupChange: (value: string) => void;
}

export default function LocationSelector({
  selectedLocation,
  locations,
  type,
  add,
  handleGroupChange,
}: LocationSelectorProps) {
  return (
    <div className="flex flex-col justify-between gap-1">
      <div className="space-y-2">
        <p className="flex items-center text-[14px] font-medium mt-[3px]">
          Ubicaciones
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span
              className="flex justify-center items-center w-[89px] bg-[#f4f4f5] text-[#7B7E86] 
          font-medium px-2 py-3 text-sm rounded-md "
            >
              {selectedLocation.length === 0 ? "Elige" : "1"}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="p-2 w-[350px] h-[180px]">
            <div className="locations">
              <ToggleGroup
                type="single"
                onValueChange={handleGroupChange}
                value={selectedLocation}
                className="locations-grid h-full p-1"
              >
                {type === "id"
                  ? locations.map((tag, i) => (
                      <ToggleGroupItem
                        variant="itemSelect"
                        size="full"
                        key={tag.id}
                        value={tag.id}
                        className={`item-${i}`}
                      >
                        {i === 0 ? tag.name : ""}
                      </ToggleGroupItem>
                    ))
                  : locations.map((tag, i) => (
                      <ToggleGroupItem
                        variant="itemSelect"
                        size="full"
                        key={tag.id}
                        value={tag.name}
                        className={`item-${i}`}
                      >
                        {i === 0 ? tag.name : ""}
                      </ToggleGroupItem>
                    ))}
              </ToggleGroup>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {add && <NewLocationButton />}
    </div>
  );
}
