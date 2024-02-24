"use client";

import React from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { SaveIcon } from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { Card } from "@/app/_components/ui/card";
import { AddSong } from "../_actions/add-song";

export const songSchema = z.object({
  title: z
    .string({ required_error: "Título obrigatório" })
    .min(1, "Campo obrigatório.")
    .trim(),
  author: z.string().optional(),
  song: z.object(
    {
      name: z.string(),
      type: z.string(),
      size: z.number(),
    },
    { required_error: "Selecione um arquivo" }
  ),
});

interface FormProps {
  defaultValues: z.infer<typeof songSchema>;
}

const AddSongForm = ({ defaultValues }: FormProps) => {
  const form = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (data: z.infer<typeof songSchema>) => {
    AddSong({
      song: data,
      userId: "123"
    })
  };

  return (
    <div className="flex items-center gap-2 px-5">
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nome da musica" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nome do artista" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Controller
            name="song"
            control={form.control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  id="songFile"
                  className="hidden"
                  accept="audio/*"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      await field.onChange(e.target.files[0]);
                    }
                  }}
                />
                {field.value.name !== "" && 
                <Card className="p-2 overflow-hidden text-ellipsis text-nowrap">{field.value.name}</Card>}
              </>
            )}
          />

          <Button variant={"secondary"} asChild>
            <label className="cursor-pointer" htmlFor="songFile">
              Escolher Música
            </label>
          </Button>

          <Button variant={"default"} type="submit" className="gap-3">
            Salvar
            <SaveIcon size={20} />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddSongForm;
