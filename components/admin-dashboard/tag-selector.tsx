import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import NewTagButton from "./new-tag-button";
import { Tag } from "@prisma/client";

interface TagSelectorProps {
  selectedTags: string[];
  tags: Tag[];
  handleGroupChange: (value: string[]) => void;
}

export default function TagSelector({
  selectedTags,
  tags,
  handleGroupChange,
}: TagSelectorProps) {
  return (
    <div className="flex flex-col justify-between gap-1">
      <div className="space-y-2">
        <p className="flex items-center text-[14px] font-medium mt-[3px]">
          Etiquetas
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span
              className="flex justify-center items-center w-[80px] bg-[#f4f4f5] text-[#7B7E86] 
                        font-medium px-2 py-3 text-sm rounded-md "
            >
              {selectedTags.length === 0 ? "Elige" : selectedTags.length}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" className="max-w-[360px]">
            <ToggleGroup
              type="multiple"
              variant="itemSelect"
              onValueChange={handleGroupChange}
              value={selectedTags}
              className="flex flex-wrap p-1"
            >
              {tags.map((tag) => (
                <ToggleGroupItem variant="outline" key={tag.id} value={tag.id}>
                  {tag.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <NewTagButton />
    </div>
  );
}
