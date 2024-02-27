"use client";

import { Music } from "@prisma/client";
import { createContext, useContext, useRef, useState } from "react";

interface CurrentSoundUrlProps {
  currentSong: Music | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<Music | undefined>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: any;
  toggleIsPlaying: (currentClickSongUrl: string) => void
}

const GlobalContext = createContext<CurrentSoundUrlProps>(null!);

export const CurrentSoundContextProvider = ({
  children,
}: {
  children: any;
}) => {
  const [currentSong, setCurrentSong] = useState<Music>();
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>();

  const toggleIsPlaying = (currentClickSongUrl: string) => {
    if (playerRef.current && currentClickSongUrl === currentSong?.url) {
      if (isPlaying) {
        setIsPlaying(false);
        playerRef.current.audio.current.pause();
      } else {
        setIsPlaying(true);
        playerRef.current.audio.current.play();
      }
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playerRef,
        toggleIsPlaying,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalCurrentSoundContext = () => useContext(GlobalContext);
