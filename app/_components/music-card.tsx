"use client"
import React from "react";
import Image from "next/image";
import { PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Music, Prisma } from "@prisma/client";
import useCurrentSoundUrl from "../_hooks/useCurrentSoundUrl";

interface MusicCardProps {
  music: Prisma.MusicGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const MusicCard = ({ music }: MusicCardProps) => {

  const { updateCurrentSoundUrl } = useCurrentSoundUrl();

  const handleNewSong = () => {
    updateCurrentSoundUrl(music.url);
  };

  return (
      <div onClick={handleNewSong} className="flex flex-col min-w-[130px] max-w-[130px] hover:bg-secondary rounded-2xl pb-2 duration-200 cursor-pointer">
        <div className="relative w-full h-[140px]">
          <Image
            alt="Barber image"
            src={music.imageUrl}
            fill
            sizes="100vw"
            className="rounded-2xl"
            style={{
              objectFit: "cover",
            }}
          />

          {/* <Button className="absolute bottom-3 right-3 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primaryYellow shadow-md shadow-black cursor-pointer p-0 hover:bg-primaryYellow">
          <PlayIcon className="text-black ml-[3px]" />
        </Button> */}
        </div>

        <div className="flex flex-col gap-1 mt-2 px-2">
          <h1 className="leading-[19px] font-semibold overflow-hidden text-ellipsis text-nowrap">
            {music.title}
          </h1>
          <small className="leading-[12px]">
            {music.author ? music.author : music.user.name}
          </small>
        </div>
      </div>
  );
};

export default MusicCard;
