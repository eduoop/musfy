"use server";
import { db } from '@/app/_lib/prisma';
import { uploadFileToS3 } from '../../_lib/s3-configuration';
interface AddSongProps {
  file: {
    title: string;
    author?: string;
    song: {
      name: string;
      type: string;
      size: number;
    };
  };
  songFile: any;
  userId: string;
}

export const AddSong = async ({ file, userId, songFile}: AddSongProps) => {
    try {
      const fileUrl = await uploadFileToS3({
        data: songFile,
        title: file.title
      });

      return fileUrl

      // await db.music.create({
      //   data: {
      //     title: file.title,
      //     url: fileUrl,
      //     userId: userId,
      //     author: file.author ?? ""
      //   }
      // })
    } catch(err) {
      console.error('Erro ao enviar arquivo para a Amazon S3:', err);
    }
}