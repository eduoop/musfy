"use server";
import { db } from "@/app/_lib/prisma";
import { uploadFileToS3, uploadImageToS3 } from "../../_lib/s3-configuration";
import { revalidatePath } from "next/cache";

interface AddSongProps {
  file: {
    title: string;
    author?: string;
    song: {
        name:string,
        type:string,
        size:number,
      },
  };
  songFile: any;
  songImage: any;
  userId: string;
}

export const AddSong = async ({ file, userId, songFile, songImage }: AddSongProps) => {
  const existingSongName = await db.music.findFirst({
    where: {
      title: file.title,
    },
  });

  if (existingSongName) {
    throw new Error('Music name already exists');
  }

  try {
    const fileUrl = await uploadFileToS3({
      data: songFile,
      title: file.title,
    });

    const fileImageUrl = await uploadImageToS3({
      data: songImage,
      title: file.title,
    })

    await db.music.create({
      data: {
        title: file.title,
        url: fileUrl,
        userId: userId,
        author: file.author ?? "",
        imageUrl: fileImageUrl,
      },
    });

    revalidatePath("/")

  } catch (err) {
    console.error("Erro ao enviar arquivo para a Amazon S3:", err);
  }
};
