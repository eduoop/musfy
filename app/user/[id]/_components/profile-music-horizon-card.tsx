"use client";
import Image from "next/image";
import React from "react";
import { Music, Prisma, User } from "@prisma/client";
import { PauseIcon, PlayIcon } from "lucide-react";
import useCurrentSoundUrl from "@/app/_hooks/useCurrentSoundUrl";
import { useGlobalCurrentSoundContext } from "@/app/_contexts/CurrentSoundContext";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";

interface ProfileMusicHorizonHard {
  music: Music;
  user: User;
}

const ProfileMusicHorizonHard = ({ music, user }: ProfileMusicHorizonHard) => {
  const { isCurrentSong, isCurrentSongAndIsPlaying, updateCurrentSoundUrl } =
    useCurrentSoundUrl();
  const { toggleIsPlaying } = useGlobalCurrentSoundContext();

  const handleNewSong = () => {
    updateCurrentSoundUrl(music);
  };

  const handlePlayClick = () => {
    if (!isCurrentSong(music.url)) {
      updateCurrentSoundUrl(music);
    }

    toggleIsPlaying(music.url);
  };

  return (
    <Card
      onClick={handleNewSong}
      className="w-full flex items-center justify-between cursor-pointer rounded-tl-2xl rounded-bl-2xl duration-300 hover:bg-secondary"
    >
      <CardContent className="flex items-center justify-between p-0 w-full gap-2">
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

          <div>
            <h1 className="leading-[19px] font-semibold overflow-hidden text-ellipsis line-clamp-1">
              {music.title}
            </h1>
            <small className="leading-[12px]">
              {music.author ? music.author : user.name}
            </small>
          </div>
        </div>

        <div className="pr-2 flex items-center">
          {isCurrentSongAndIsPlaying(music.url) ? (
            <Button className="px-2" onClick={handlePlayClick} variant={"secondary"}>
              <PauseIcon className="fill-white" size={19} />
            </Button>
          ) : (
            <Button
              onClick={() => toggleIsPlaying(music.url)}
              variant={"secondary"}
              className="px-2"
            >
              <PlayIcon className="fill-white" size={19} />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileMusicHorizonHard;
