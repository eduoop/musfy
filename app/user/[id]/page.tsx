import React from "react";
import UserInfo from "./_components/user-info";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { db } from "@/app/_lib/prisma";
import ProfileMusicHorizonHard from "./_components/profile-music-horizon-card";

interface UserProps {
  params: {
    id?: string;
  };
}

const User = async ({ params }: UserProps) => {
  const session = await getServerSession(authOptions);

  if (!session?.user || !params.id) {
    // TODO redirect to home
    return null;
  }

  const user = await db.user.findFirst({
    where: {
      id: params.id,
    },
    include: {
      musics: true,
    },
  });

  return (
    <>
      {user && (
        <>
          <UserInfo user={user} />

          <h1 className="px-5 mb-3 text-xl font-semibold mt-6">Musicas:</h1>

          <div className="px-5 flex flex-col gap-3">
            {user.musics.map((music) => (
              <ProfileMusicHorizonHard
                user={user}
                key={music.id}
                music={music}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default User;
