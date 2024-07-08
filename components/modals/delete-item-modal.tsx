/* eslint-disable @next/next/no-img-element */
"use client";

import z from "zod";
import axios from "axios";
import { uploadImages } from "@/lib/utils";

import { useModal } from "@/hooks/use-modal";
import { useOwners } from "@/hooks/use-owners";
import { useLocations } from "@/hooks/use-locations";
import { useTags } from "@/hooks/use-tags";
import { useImages } from "@/hooks/use-images";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import NewOwnerButton from "@/components/admin-dashboard/new-owner-button";
import Images from "@/components/admin-dashboard/Images";
import LocationSelector from "@/components/admin-dashboard/location-selector";
import TagSelector from "@/components/admin-dashboard/tag-selector";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Es necesario el nombre del producto" }),
  price: z.coerce
    .number()
    .positive({ message: "El precio debe ser mayor a cero" }),
  boughtAt: z.coerce.number().default(0),
  description: z.string().optional().default(""),
  owner: z.string().min(1, { message: "Es necesario el nombre del dueño" }),
});

export default function DeleteItemModal() {
  const { isOpen, onClose, type, data } = useModal();
  const { item } = data;

  const isModalOpen = isOpen && type === "deleteItem";

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);

    await axios.delete(`/api/items`, { params: { itemId: item?.id } });

    setIsLoading(false);
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>¿Eliminar Articulo?</DialogTitle>
        <DialogDescription className="text-lg">
          ¿Está seguro que desea elminar <strong>{item?.name}</strong>?
        </DialogDescription>

        <DialogFooter className="pt-4 flex gap-1">
          <Button
            className="text-black"
            disabled={isLoading}
            variant="link"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClose();
            }}
          >
            Cancelar
          </Button>
          <Button disabled={isLoading} variant="destructive" onClick={onSubmit}>
            Eliminar Articulo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
