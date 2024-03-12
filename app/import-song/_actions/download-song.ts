"use server";

interface VideoInfo {
  link: string;
  title: string;
  filesize: number;
  progress: number;
  duration: number;
  status: string;
  msg: string;
}
import { db } from "@/app/_lib/prisma";
import { uploadFileToS3, uploadImageToS3 } from "@/app/_lib/s3-configuration";
import { revalidatePath } from "next/cache";

export const downloadSong = async (songUrl: string, userId: string) => {
  const mm = require("music-metadata");

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY ?? "",
      "X-RapidAPI-Host": process.env.API_HOST ?? "",
    },
  };

  function extractYouTubeVideoId(url: string): string {
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^/]+\/u\/\d\/|user\/\w\/|v\/|embed\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(videoIdRegex);

    return match ? match[1] : "";
  }

  const url = new URL("https://youtube-mp36.p.rapidapi.com/dl");
  url.searchParams.append("id", extractYouTubeVideoId(songUrl));

  const response = await fetch(url.toString(), options);
  const data: VideoInfo = await response.json();

  const existingSongName = await db.music.findFirst({
    where: {
      title: data.title,
    },
  });

  if (existingSongName) {
    console.log("Música com mesmo nome já existe.");
    throw new Error("Music already exists");
  }

  const responseFile = await fetch(data.link);
  const arrayBuffer = await responseFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Data = buffer.toString("base64");

  // Verificação se o arquivo possue imagem de capa
  const metadata = await mm.parseBuffer(buffer, { mimeType: "audio/mpeg" });
  if (
    metadata.common &&
    metadata.common.picture &&
    metadata.common.picture.length > 0
  ) {
    const coverData = metadata.common.picture[0].data;
    const responseFileImage = Buffer.from(coverData).toString("base64");

    const imageObject = {
      name: `${data.title}.${metadata.common.picture[0].format.split("/")[1]}`,
      type: metadata.common.picture[0].format,
      size: coverData.length,
      data: responseFileImage,
    };

    const fileObject = {
      name: `${data.title}.mp3`,
      type: "audio/mpeg",
      size: data.filesize,
      data: base64Data,
    };

    try {
      const fileUrl = await uploadFileToS3({
        data: fileObject,
        title: data.title,
      });

      const fileImageUrl = await uploadImageToS3({
        data: imageObject,
        title: data.title,
      });

      await db.music.create({
        data: {
          title: data.title,
          url: fileUrl,
          userId: userId,
          author: "",
          imageUrl: fileImageUrl,
        },
      });

      revalidatePath("/");
    } catch (err) {
      console.error("Erro ao enviar arquivo para a Amazon S3:", err);
    }
  } else {
    console.log("Capa não encontrada no arquivo MP3.");
  }
};
