"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/_components/ui/use-toast";
import { downloadSong } from "../_actions/download-song";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Eye, Loader2, SaveIcon } from "lucide-react";

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

const FormPreview = ({ defaultValues }: importSoundProps) => {
  const [videoIdPreview, setVideoIdPreview] = useState("");
  const { data } = useSession();
  const [loadingSave, setLoadingSave] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof importSoundSchema>>({
    resolver: zodResolver(importSoundSchema),
    defaultValues: defaultValues,
  });

  function extractYouTubeVideoId(url: string): string {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/u\/\d\/|user\/\w\/|v\/|embed\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);

    return match ? match[1] : "";
  }

  const handleSubmit = async (formData: z.infer<typeof importSoundSchema>) => {
    setLoadingSave(true);
    try {
      if (data && data.user) {
        await downloadSong(formData.url, (data.user as any).id);

        toast({
          title: "Musica importada com sucesso!",
        });
        router.push("/");
      }
    } catch (error) {
      if (typeof error === "object" && error !== null && "message" in error) {
        if ((error as Error).message === "Music already exists") {
          toast({
            title: "Música com mesmo nome já existe.",
          });
        } else {
          console.log("Erro ao importar música:", (error as Error).message);
        }
      }
    } finally {
      setLoadingSave(false);
    }
  };

  const previewSong = async (formData: z.infer<typeof importSoundSchema>) => {
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const isValidUrl = youtubeRegex.test(formData.url);

    if (isValidUrl) {
      setVideoIdPreview(extractYouTubeVideoId(formData.url));
    } else {
      toast({
        title: "Vídeo inválido",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          className="px-5 py-6 flex gap-3 flex-col md:flex-row"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Url da música" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-3">
            <Button
              disabled={loadingSave}
              variant={"default"}
              className="gap-3 w-full"
              type="button"
              onClick={() => previewSong(form.getValues())}
            >
              <Eye size={20} />
              Previzualizar
            </Button>

            <Button
              disabled={loadingSave}
              variant={"default"}
              type="submit"
              className="gap-3 w-full"
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
          </div>
        </form>
      </Form>

      {videoIdPreview && (
        <div className="w-full px-5">
          <div className="rounded-md w-full md:w-fit">
            <iframe
              className="w-full h-[450px] md:w-[600px] md:h-80"
              src={`https://www.youtube.com/embed/${videoIdPreview}`}
              title="YouTube video player"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FormPreview;
