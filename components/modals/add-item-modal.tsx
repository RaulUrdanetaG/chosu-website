/* eslint-disable @next/next/no-img-element */
"use client";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import NewOwnerButton from "@/components/admin-dashboard/new-owner-button";
import { useOwners } from "@/hooks/use-owners";
import { useLocations } from "@/hooks/use-locations";
import NewLocationButton from "@/components/admin-dashboard/new-location-button";
import NewTagButton from "@/components/admin-dashboard/new-tag-button";
import { useTags } from "@/hooks/use-tags";

import { useImages } from "@/hooks/use-images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Images from "../admin-dashboard/Images";
import { uploadImages } from "@/lib/utils";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

export default function AddItemModal() {
  const { owners } = useOwners();

  const { locations, selectedLocation, setSelectedLocation, resetLocation } =
    useLocations();
  const { tags, selectedTags, setSelectedTags, resetTags } = useTags();

  const { images, resetImages, handleImageUpload, shift } = useImages();

  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createItem";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      boughtAt: 0,
      description: "",
      owner: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imageLinks = await uploadImages(images.selectedFiles);

    console.log(imageLinks);

    axios.post("/api/items", {
      values,
      imageLinks: imageLinks?.data,
      tags: selectedTags,
      location: selectedLocation,
    });

    form.reset();
    resetImages();
    resetTags();
    resetLocation();
  }

  function handleTagsGroupChange(value: string[]) {
    setSelectedTags(value);
  }

  function handleLocationGroupChange(value: string) {
    setSelectedLocation(value);
  }

  function handleClose() {
    form.reset();
    resetImages();
    onClose();
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle hidden>Crear articulo</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1"
          >
            <Images
              imagePreviews={images.imagePreviews}
              handleImageUpload={handleImageUpload}
              removeImages={images.removeImage}
              shift={shift}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-zinc-100"
                      placeholder="Nombre del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-100"
                        type="number"
                        placeholder="Precio del producto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="boughtAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio de compra</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-zinc-100"
                        type="number"
                        placeholder="En cuanto se adquirió el producto del proveedor"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      className="bg-zinc-100"
                      placeholder="Descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dueño</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="bg-zinc-100">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent side="top">
                          {owners.map((owner) => (
                            <SelectItem key={owner.id} value={owner.id}>
                              {owner.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <NewOwnerButton />
              </div>

              <div className="flex flex-col justify-between gap-1">
                <div className="space-y-2">
                  <p className="flex items-center text-[14px] font-medium mt-[3px]">
                    Etiquetas
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button
                        className="flex justify-center items-center w-[80px] bg-[#f4f4f5] text-[#7B7E86] 
                        font-medium px-2 py-3 text-sm rounded-md "
                      >
                        {selectedTags.length === 0
                          ? "Elige"
                          : selectedTags.length}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" className="max-w-[360px]">
                      <ToggleGroup
                        type="multiple"
                        onValueChange={handleTagsGroupChange}
                        value={selectedTags}
                        className="flex flex-wrap p-1"
                      >
                        {tags.map((tag) => (
                          <ToggleGroupItem
                            variant="outline"
                            key={tag.id}
                            value={tag.id}
                          >
                            {tag.name}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <NewTagButton />
              </div>
              <div className="flex flex-col justify-between gap-1">
                <div className="space-y-2">
                  <p className="flex items-center text-[14px] font-medium mt-[3px]">
                    Ubicaciones
                  </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <button
                        className="flex justify-center items-center w-[89px] bg-[#f4f4f5] text-[#7B7E86] 
                        font-medium px-2 py-3 text-sm rounded-md "
                      >
                        {selectedLocation.length === 0 ? "Elige" : "1"}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="top"
                      className="p-2 w-[350px] h-[180px]"
                    >
                      <div className="locations">
                        <ToggleGroup
                          type="single"
                          onValueChange={handleLocationGroupChange}
                          value={selectedLocation}
                          className="locations-grid h-full p-1"
                        >
                          {locations.map((tag, i) => (
                            <ToggleGroupItem
                              variant="locationSelect"
                              size="full"
                              key={tag.id}
                              value={tag.id}
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

                <NewLocationButton />
              </div>
            </div>
            <DialogFooter className="pt-4 flex gap-1">
              <Button
                disabled={isLoading}
                variant="destructive"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleClose();
                }}
              >
                Cancelar
              </Button>
              <Button disabled={isLoading} type="submit">
                Agregar Producto
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
