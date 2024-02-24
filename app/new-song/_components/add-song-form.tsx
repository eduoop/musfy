"use client";

import React, { useState } from "react";
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
import {
  CameraIcon,
  GalleryVerticalIcon,
  Loader2,
  SaveIcon,
  User2Icon,
} from "lucide-react";
import { Input } from "@/app/_components/ui/input";
import { Card } from "@/app/_components/ui/card";
import { AddSong } from "../_actions/add-song";
import { useSession } from "next-auth/react";
import { toast, useToast } from "@/app/_components/ui/use-toast";
import { ToastAction } from "@/app/_components/ui/toast";
import { useRouter } from "next/navigation";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

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
  const [loadingSave, setLoadingSave] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const { data } = useSession();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof songSchema>>({
    resolver: zodResolver(songSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = async (formData: z.infer<typeof songSchema>) => {
    if (!selectedFile) {
      toast({
        title: "Selecione um arquivo de música",
        action: <ToastAction altText="Fechar">Fechar</ToastAction>,
      });
    }
    if (data) {
      setLoadingSave(true);
      try {
        await AddSong({
          file: formData,
          userId: (data.user as any).id,
          songFile: selectedFile,
        });
        toast({
          title: "Musica adicionada com sucesso!",
        });
        router.push("/");
      } catch (err) {
        const error = err as Error;

        if (error.message.includes("Music name already exists")) {
          toast({
            title: "Erro: Música com mesmo nome já existe.",
          });
        }
      } finally {
        setLoadingSave(false);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        let fileData: Uint8Array;
        if ((reader.result as ArrayBuffer).byteLength !== 0) {
          fileData = new Uint8Array(reader.result as ArrayBuffer);
        } else {
          throw new Error("Failed to read the file as an ArrayBuffer");
        }

        const buffer = Buffer.from(fileData);
        const base64Data = buffer.toString("base64");

        const fileObject = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: base64Data,
        };

        setSelectedFile(fileObject);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  function convertImageToUrl(file: any) {
    console.log(file);
    if (!file) {
      return (
        <AvatarFallback>
          <CameraIcon size={35} />
        </AvatarFallback>
      );
    }

    const blob = new Blob([file], { type: file.type });

    return <AvatarImage src={URL.createObjectURL(blob)} alt={file.name} />;
  }

  return (
    <div className="flex items-center gap-2 px-5">
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <input
            type="file"
            id="songImage"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              handleFileChange(e);
              if (e.target.files && e.target.files.length > 0) {
                setSelectedImage(e.target.files[0]);
              }
            }}
          />

          <Avatar asChild className="w-28 h-28 cursor-pointer">
            <label htmlFor="songImage">
              {convertImageToUrl(selectedImage)}
            </label>
          </Avatar>

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
                    handleFileChange(e);
                    if (e.target.files && e.target.files.length > 0) {
                      await field.onChange(e.target.files[0]);
                    }
                  }}
                />
                {field.value.name !== "" && (
                  <Card className="p-2 overflow-hidden text-ellipsis text-nowrap">
                    {field.value.name}
                  </Card>
                )}
              </>
            )}
          />

          <Button variant={"secondary"} asChild>
            <label className="cursor-pointer" htmlFor="songFile">
              Escolher Música
            </label>
          </Button>

          <Button
            disabled={loadingSave}
            variant={"default"}
            type="submit"
            className="gap-3"
          >
            {loadingSave ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Salvando
              </>
            ) : (
              <>
                <SaveIcon size={20} />
                Salvar
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddSongForm;
