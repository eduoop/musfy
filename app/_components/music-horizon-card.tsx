import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Music, Prisma } from "@prisma/client";
import { Button } from "./ui/button";
import { PlayIcon } from "lucide-react";

interface MusicHorizonCardProps {
  music: Prisma.MusicGetPayload<{
    include: {
      user: true;
    };
  }>;
}

const MusicHorizonCard = ({ music }: MusicHorizonCardProps) => {
  return (
    <Card className="w-full flex items-center justify-between cursor-pointer rounded-tl-2xl rounded-bl-2xl duration-300">
      <CardContent className="flex items-center justify-between p-0 w-full">
        <div className="flex items-center gap-2">
          <div className="relative h-[70px] w-[70px]">
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
            <h1 className="leading-[19px] font-semibold overflow-hidden text-ellipsis text-nowrap">
              {music.title}
            </h1>
            <small className="leading-[12px]">
              {music.author ? music.author : music.user.name}
            </small>
          </div>
        </div>

        <div className="pr-4 flex items-center">
          <Button variant={"secondary"}>
            <PlayIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicHorizonCard;
