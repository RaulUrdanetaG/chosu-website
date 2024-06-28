/* eslint-disable @next/next/no-img-element */
"use client";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { useEffect, useState } from "react";
import NewOwnerButton from "../admin-dashboard/new-owner-button";
import { useOwners } from "@/hooks/use-owners";

const formSchema = z.object({
  name: z.string().min(1, { message: "Es necesario el nombre del producto" }),
  price: z.coerce
    .number()
    .positive({ message: "El precio debe ser mayor a cero" }),
  boughtAt: z.coerce.number().default(0),
  description: z.string().optional().default(""),
});

export default function AddItemModal() {
  const { owners } = useOwners();
  const { isOpen, onClose, type } = useModal();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const isModalOpen = isOpen && type === "createItem";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      boughtAt: 0,
      description: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const imgData = new FormData();
    images.forEach((image) => {
      imgData.append("file", image);
    });

    const imageLinks = await axios.post("/api/googleCloud/images", imgData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    axios.post("/api/items", { values, imageLinks });

    form.reset();
    setImages([]);
    setImagePreviews([]);
  }

  function handleClose() {
    form.reset();
    setImages([]);
    setImagePreviews([]);
    onClose();
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) return;

    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  }

  useEffect(() => {
    const newImagePreviews = images.map((image) => URL.createObjectURL(image));
    setImagePreviews(newImagePreviews);
  }, [images]);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar Producto</DialogTitle>
          <DialogDescription>
            Completa el formulario para agregar un nuevo producto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-1"
          >
            <FormItem>
              <FormLabel>Imágenes</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                />
              </FormControl>
              <FormMessage />
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: 8 }}>
                <RenderImagePreviews imagePreviews={imagePreviews} />
              </div>
            </FormItem>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del producto" {...field} />
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
            <NewOwnerButton />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripción del producto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

function RenderImagePreviews({ imagePreviews }: { imagePreviews: string[] }) {
  return imagePreviews.map((url, index) => (
    <img
      key={index}
      src={url}
      alt={`Preview ${index}`}
      style={{ width: 100, height: 100, objectFit: "cover", margin: 4 }}
    />
  ));
}
