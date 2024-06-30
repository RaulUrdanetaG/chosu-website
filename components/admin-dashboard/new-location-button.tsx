"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useStore } from "@/hooks/use-store";
import { useToast } from "@/components/ui/use-toast";
import { Plus, SquarePlus } from "lucide-react";
import { useState } from "react";

export default function NewLocationButton() {
  const { toast } = useToast();
  const { locations, setLocations } = useStore();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCreate() {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/locations", { name });

      if (response.data.exists) {
        toast({
          className: "bg-dash_primary text:dash_secondary",
          description: "Esta ubicación ya existe!",
        });
      } else {
        locations.push(response.data);
        setLocations(locations);

        toast({
          className: "bg-dash_primary text:dash_secondary",
          description: "Ubicación creada correctamente!",
        });
      }

      setName("");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh Oh! Algo falló :(",
        description: "Intenta nuevamente",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="xs"
          className="flex justify-center items-center"
        >
          Ubicación <Plus className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-zinc-100">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name">Ubicación</label>
            <input
              id="name"
              type="text"
              placeholder="Nombre de la ubicación"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-200 p-2 rounded-md mt-1"
              required
            />
          </div>
          <Button
            type="button"
            size="sm"
            onClick={handleCreate}
            disabled={isLoading}
          >
            Crear
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
