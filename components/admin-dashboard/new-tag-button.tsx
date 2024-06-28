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
} from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { useStore } from "@/hooks/use-store";

const formSchema = z.object({
  name: z.string().min(1, { message: "Es necesario el nombre del dueño" }),
});

export default function NewTagButton() {
  const { tags, setTags } = useStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const newTag = await axios.post("/api/tags", data);
    tags.push(newTag.data);
    setTags(tags);

    form.reset();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Agregar Etiquieta</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del dueño" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
