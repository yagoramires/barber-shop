"use client";
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  search: z
    .string({ required_error: "Campo obrigatório" })
    .trim()
    .min(1, "Campo obrigatório"),
});

interface SearchProps {
  defaultValues?: z.infer<typeof formSchema>;
}

export default function SearchBar({ defaultValues }: SearchProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push("/barbershops?search=" + data.search);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full items-start gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className="focus-visible:ring-transparent"
                  placeholder="Encontre seu barbeiro"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          size="icon"
          variant="default"
          className="p-[10px]"
          type="submit"
        >
          <SearchIcon size={18} />
        </Button>
      </form>
    </Form>
  );
}
