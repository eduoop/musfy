import Image from "next/image";
import Header from "../_components/header";
import Search from "./_components/search";
import MusicCard from "../_components/music-card";
import MusicHorizonCard from "../_components/music-horizon-card";

export default function Home() {
  const musics = [1, 2, 3, 4, 5, 5, 6, 7];

  return (
    <div className="min-h-screen">

      <div className="px-5 my-6">
        <Search />
      </div>

      <h1 className="px-5 mb-3 text-xl font-semibold">Descobrir</h1>

      <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        {musics.map((number) => (
          <MusicCard key={number} />
        ))}
      </div>

      <h1 className="px-5 mb-3 text-xl font-semibold mt-6">
        Adicionadas recentemente
      </h1>

      <div className="px-5 flex flex-col gap-3">
       {musics.map((number) => (
         <MusicHorizonCard key={number} />
       ))}
      </div>
    </div>
  );
}
