/* eslint-disable @next/next/no-img-element */
"use client";

import z from "zod";
import axios from "axios";
import { uploadImages } from "@/lib/utils";

import { useModal } from "@/hooks/use-modal";
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
import { useEffect } from "react";
import { useStore } from "@/hooks/use-store";

const formSchema = z.object({
  name: z.string().min(1, { message: "Es necesario el nombre del producto" }),
  price: z.coerce
    .number()
    .positive({ message: "El precio debe ser mayor a cero" }),
  boughtAt: z.coerce.number().default(0),
  description: z.string().optional().default(""),
  owner: z.string().min(1, { message: "Es necesario el nombre del dueño" }),
});

export default function EditItemModal() {
  const { locations, owners, tags } = useStore();

  const { selectedLocation, setSelectedLocation } = useLocations();
  const { selectedTags, setSelectedTags, resetTags } = useTags();
  const {
    images,
    setImagePreviews,
    setSelectedFiles,
    resetImages,
    handleImageUpload,
    shift,
  } = useImages();

  const { isOpen, onClose, type, data } = useModal();
  const { item } = data;

  const isModalOpen = isOpen && type === "editItem";

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
    let imageLinkPos = 0;

    images.imagePreviews.forEach((image, index) => {
      if (image.startsWith("blob")) {
        images.imagePreviews[index] = imageLinks?.data[imageLinkPos];
        imageLinkPos++;
      }
    });

    await axios.patch("/api/items", {
      values,
      id: item?.id,
      imageLinks: images.imagePreviews,
      tags: selectedTags,
      location: selectedLocation,
    });

    onClose();
  }

  function handleClose() {
    resetImages();
    resetTags();
    onClose();
  }

  useEffect(() => {
    if (item) {
      form.setValue("name", item.name);
      form.setValue("price", item.price);
      form.setValue("boughtAt", item.boughtAt);
      form.setValue("description", item.description);
      form.setValue("owner", item.ownerId);
      setSelectedTags(item.tagsIds);
      setSelectedLocation(item.locationId);
      setImagePreviews(item.imgUrls);

      // Creates an array with the same length as item images so the
      // shift and remove functions keep the imagePreviews and selectedFiles
      // array in sync
      const newRelationArray = Array(item.imgUrls.length).fill(
        null as unknown as File
      );
      setSelectedFiles(newRelationArray);
    }
  }, [
    item,
    setSelectedTags,
    setSelectedLocation,
    setImagePreviews,
    setSelectedFiles,
    form,
  ]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle hidden>Crear articulo</DialogTitle>
        <DialogDescription hidden>
          Llena el formulario para crear un articulo
        </DialogDescription>

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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={item?.ownerId}
                      >
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
              <TagSelector
                selectedTags={selectedTags}
                tags={tags}
                handleGroupChange={setSelectedTags}
                type="id"
                add
              />
              <LocationSelector
                selectedLocation={selectedLocation}
                locations={locations}
                handleGroupChange={setSelectedLocation}
                type="id"
                add={false}
              />
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
                Actualizar Producto
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
