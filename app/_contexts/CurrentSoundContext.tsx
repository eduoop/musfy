"use client";

import { createContext, useContext, useRef, useState } from "react";

interface CurrentSoundUrlProps {
  currentSongUrl: string;
  setCurrentSongUrl: React.Dispatch<React.SetStateAction<string>>;
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
  const [currentSongUrl, setCurrentSongUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>();

  const toggleIsPlaying = (currentClickSongUrl: string) => {
    if (playerRef.current && currentClickSongUrl === currentSongUrl) {
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
        currentSongUrl,
        setCurrentSongUrl,
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
