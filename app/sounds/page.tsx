import React from "react";
import { db } from "../_lib/prisma";
import MusicHorizonCard from "../_components/music-horizon-card";
import { redirect } from "next/navigation";
import Search from "../(home)/_components/search";

interface SoundsPageProps {
  searchParams: {
    search?: string;
  };
}

const Sounds = async ({ searchParams }: SoundsPageProps) => {
  const sounds = await db.music.findMany({
    where: {
      title: {
        contains: searchParams.search,
        mode: "insensitive",
      },
    },
    include: {
      user: true,
    },
  });

  if (!searchParams.search) {
    return redirect("/");
  }

  return (
    <div className="my-6">

      <div className="px-5 mt-6">
        <Search defaultValues={{
          search: searchParams.search
        }}/>
      </div>

      <h1 className="px-5 mb-3 text-xl font-semibold mt-6">
        Resultados para: {searchParams.search}
      </h1>

      <div className="px-5 flex flex-col gap-3">
        {sounds.map((music, index) => (
          <MusicHorizonCard key={music.id} music={music} isLast={index === sounds.slice().length - 1}/>
        ))}
      </div>
    </div>
  );
};

export default Sounds;
