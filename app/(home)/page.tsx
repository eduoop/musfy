import Image from "next/image";
import Header from "../_components/header";
import Search from "./_components/search";
import MusicCard from "../_components/music-card";
import MusicHorizonCard from "../_components/music-horizon-card";
import { db } from "../_lib/prisma";

export default async function Home() {
  const [recentSounds, discoverSounds] = await Promise.all([
    db.music.findMany({
      where: {
        createdAt: {
          lte: new Date(),
        },
      },
      include: {
        user: true,
      },
    }),

    db.music.findMany({
      where: {
        createdAt: {
          lte: new Date(),
        },
      },
      include: {
        user: true,
      },
    }),
  ]);

  return (
    <div className="min-h-screen">
      <div className="px-5 my-6">
        <Search
          defaultValues={{
            search: "",
          }}
        />
      </div>

      <h1 className="px-5 mb-3 text-xl font-semibold">Descobrir</h1>

      <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {discoverSounds.map((music) => (
          <MusicCard music={music} key={music.id} />
        ))}
      </div>

      <h1 className="px-5 mb-3 text-xl font-semibold mt-6">
        Adicionadas recentemente
      </h1>

      <div className="px-5 flex flex-col gap-3">
        {recentSounds.map((music, index) => (
          <MusicHorizonCard key={music.id} music={music} isLast={index === recentSounds.slice().length - 1}
          />
        ))}
      </div>
    </div>
  );
}
