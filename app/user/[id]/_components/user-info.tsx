import MusicHorizonCard from "@/app/_components/music-horizon-card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Separator } from "@/app/_components/ui/separator";
import { Music, Prisma, User } from "@prisma/client";
import React from "react";
import ProfileMusicHorizonHard from "./profile-music-horizon-card";

interface UserInfoProps {
  user: Prisma.UserGetPayload<{
    include: {
      musics: true;
    };
  }>;
}

const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <div>
      <div className="px-5 py-6 items-center flex w-full">
        <Avatar className="w-28 h-28 shadow-xl">
          <AvatarImage src={user.image ?? ""} />
          <AvatarFallback>
            {user.name && user.name[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col ml-2">
          <h1 className="font-bold text-xl">{user.name}</h1>
        </div>
      </div>

      <Separator orientation="horizontal" className="bg-secondary mb-6" />
    </div>
  );
};

export default UserInfo;
