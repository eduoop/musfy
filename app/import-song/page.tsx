"use client";
import React, { useState } from "react";
import { downloadSong } from "./_actions/download-song";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../_components/ui/form";
import { Input } from "../_components/ui/input";
import { Button } from "../_components/ui/button";
import { Eye, Loader2, SaveIcon } from "lucide-react";
import { useToast } from "../_components/ui/use-toast";
import { useRouter } from "next/navigation";
import FormPreview from "./_components/form";

const importSoundSchema = z.object({
  url: z.string().refine(
    (value) => {
      const youtubeRegex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

      return youtubeRegex.test(value);
    },
    {
      message: "URL inválida",
    }
  ),
});

interface importSoundProps {
  defaultValues: z.infer<typeof importSoundSchema>;
}

const ImportSound = () => {

  return (
    <>
      <h1 className="px-5 py-6 text-xl font-semibold">
        Importe uma música do youtube
      </h1>

      <FormPreview defaultValues={{url: ""}}/>
    </>
  );
};

export default ImportSound;
