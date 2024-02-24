"use server";

interface AddSongProps {
  song: {
    title: string;
    author?: string;
    song: {
      name: string;
      type: string;
      size: number;
    };
  };
  userId: string;
}

export const AddSong = async ({ song, userId}: AddSongProps) => {
    console.log(song, userId)
};
