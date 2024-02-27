"use client";
import React from "react";
import Image from "next/image";
import { PauseIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Music, Prisma } from "@prisma/client";
import useCurrentSoundUrl from "../_hooks/useCurrentSoundUrl";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";

interface MusicCardProps {
  music: Prisma.MusicGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const MusicCard = ({ music }: MusicCardProps) => {
  const { updateCurrentSoundUrl, isCurrentSongAndIsPlaying, isCurrentSong } =
    useCurrentSoundUrl();

  const { toggleIsPlaying } = useGlobalCurrentSoundContext();

  const handleNewSong = () => {
    updateCurrentSoundUrl(music);
  };

  const titleStyle = isCurrentSong(music.url)
    ? "leading-[19px] font-semibold overflow-hidden text-ellipsis text-nowrap text-primaryOrange"
    : "leading-[19px] font-semibold overflow-hidden text-ellipsis text-nowrap";

  const cardStyle = isCurrentSong(music.url)
    ? "flex flex-col min-w-[130px] max-w-[130px] bg-secondary pb-2 duration-200 cursor-pointer rounded-t-2xl rounded-xl"
    : "flex flex-col min-w-[130px] max-w-[130px] hover:bg-secondary rounded-2xl pb-2 duration-200 cursor-pointer";

  return (
    <div onClick={handleNewSong} className={cardStyle}>
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
        {isCurrentSong(music.url) &&
          (isCurrentSongAndIsPlaying(music.url) ? (
            <Button
              onClick={() => toggleIsPlaying(music.url)}
              className="absolute bottom-3 right-3 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primaryYellow shadow-md shadow-black cursor-pointer p-0 hover:bg-primaryYellow"
            >
              <PauseIcon className="text-black fill-black" size={19} />
            </Button>
          ) : (
            <Button
              onClick={() => toggleIsPlaying(music.url)}
              className="absolute bottom-3 right-3 w-[30px] h-[30px] flex justify-center items-center rounded-full bg-primaryYellow shadow-md shadow-black cursor-pointer p-0 hover:bg-primaryYellow"
            >
              <PlayIcon className="text-black ml-[3px] fill-black" size={19} />
            </Button>
          ))}
      </div>

      <div className="flex flex-col gap-1 mt-2 px-2">
        <h1 className={titleStyle}>{music.title}</h1>
        <small className="leading-[12px]">
          {music.author ? music.author : music.user.name}
        </small>
      </div>
    </div>
  );
};

export default MusicCard;
