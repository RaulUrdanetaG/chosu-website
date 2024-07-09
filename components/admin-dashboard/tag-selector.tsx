'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import NewTagButton from "./new-tag-button";
import { Tag } from "@prisma/client";
import { cn } from "@/lib/utils";

interface TagSelectorProps {
  selectedTags: string[];
  tags: Tag[];
  type: "id" | "name";
  add: boolean;
  handleGroupChange: (value: string[]) => void;
}

export default function TagSelector({
  selectedTags,
  tags,
  type,
  add,
  handleGroupChange,
}: TagSelectorProps) {
  return (
    <div className="flex flex-col justify-between gap-1">
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
          Etiquetas
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span
              className={cn(
                "flex justify-center items-center bg-[#f4f4f5] text-[#7B7E86] font-medium px-2 py-3 text-sm rounded-md",
                type === "id" ? "w-[80px] h-[44px]" : "h-9 w-16"
              )}
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
              {type === "id"
                ? tags.map((tag) => (
                    <ToggleGroupItem
                      variant="outline"
                      key={tag.id}
                      value={tag.id}
                    >
                      {tag.name}
                    </ToggleGroupItem>
                  ))
                : tags.map((tag) => (
                    <ToggleGroupItem
                      variant="outline"
                      key={tag.id}
                      value={tag.name}
                    >
                      {tag.name}
                    </ToggleGroupItem>
                  ))}
            </ToggleGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {add && <NewTagButton />}
    </div>
  );
}
