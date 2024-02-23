import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";

const MusicHorizonCard = () => {
  return (
    <Card className="w-full flex items-center justify-between cursor-pointer rounded-tl-2xl rounded-bl-2xl duration-300">
      <CardContent className="flex items-center gap-1 p-0">
        <div className="relative h-[70px] w-[70px]">
          <Image
            alt="Barber image"
            src={"/sky.jpg"}
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
          Clear mind with big name
        </h1>
        <small className="leading-[12px]">Instrumental</small>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicHorizonCard;
