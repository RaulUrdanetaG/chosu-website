"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useStore } from "@/hooks/use-store";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Es necesario el nombre del dueño" }),
});

export default function NewTagButton() {
  const { toast } = useToast();
  const { tags, setTags } = useStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const newTag = await axios.post("/api/tags", data);

      tags.push(newTag.data);
      setTags(tags);

      toast({
        className: "bg-dash_primary text:dash_secondary",
        description: "Etiqueta creada correctamente!",
      });

      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oh Oh! Algo falló :(",
        description: "Intenta nuevamente",
      });
      console.log(error);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button size='xs' className="flex justify-center items-center">
          Etiqueta <Plus className="w4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2 bg-zinc-100">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Etiqueta</FormLabel>
                  <FormControl>
                    <Input className="bg-zinc-200" placeholder="Nombre de la etiqueta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Crear
            </Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
