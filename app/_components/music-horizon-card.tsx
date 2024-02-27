"use client";

import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Music, Prisma } from "@prisma/client";
import { Button } from "./ui/button";
import { PauseIcon, PlayIcon } from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";
import useCurrentSoundUrl from "../_hooks/useCurrentSoundUrl";

interface MusicHorizonCardProps {
  music: Prisma.MusicGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const MusicHorizonCard = ({ music }: MusicHorizonCardProps) => {
  const { isCurrentSong, isCurrentSongAndIsPlaying, updateCurrentSoundUrl } = useCurrentSoundUrl();
  const { toggleIsPlaying } = useGlobalCurrentSoundContext();

  const handleNewSong = () => {
    updateCurrentSoundUrl(music);
  };

  const handlePlayClick = () => {
    if(!isCurrentSong(music.url)){
      updateCurrentSoundUrl(music);
    }

    toggleIsPlaying(music.url);
  }

  return (
    <Card onClick={handleNewSong} className="w-full flex items-center justify-between cursor-pointer rounded-tl-2xl rounded-bl-2xl duration-300 hover:bg-secondary">
      <CardContent className="flex items-center justify-between p-0 w-full">
        <div className="flex items-center gap-2">
          <div className="relative h-[70px] min-w-[70px] max-w-[70px]">
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
          </div>

          <div className="w-[90%]">
            <h1 className="leading-[19px] font-semibold overflow-hidden text-ellipsis line-clamp-1 ">
              {music.title}
            </h1>
            <small className="leading-[12px]">
              {music.author ? music.author : music.user.name}
            </small>
          </div>
        </div>

        <div className="pr-2 flex items-center">
          {isCurrentSongAndIsPlaying(music.url) ? (
              <Button className="px-2" onClick={handlePlayClick} variant={"secondary"}>
                <PauseIcon className="fill-white" size={19} />
              </Button>
            ) : (
              <Button className="px-2" onClick={() => toggleIsPlaying(music.url)} variant={"secondary"}>
                <PlayIcon className="fill-white" size={19} />
              </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicHorizonCard;
