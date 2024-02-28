"use client";

import { Music } from "@prisma/client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  Component,
} from "react";

interface CurrentSoundUrlProps {
  currentSong: Music | undefined;
  setCurrentSong: React.Dispatch<React.SetStateAction<Music | undefined>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playerRef: any;
  toggleIsPlaying: (currentClickSongUrl: string) => void;
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

  // Salvar tempo e musica antes da página sera fechada, e recuperar valores ao ser reaberta

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem(
        "currentSongTime",
        JSON.stringify(playerRef.current.audio.current.currentTime)
      );

      if (currentSong) {
        localStorage.setItem("currentSong", JSON.stringify(currentSong));
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentSong]);

  // Resgatar musica que o usuário estava escutando
  useEffect(() => {
    const storedSong = localStorage.getItem("currentSong");

    if (storedSong) {
      try {
        setCurrentSong(JSON.parse(storedSong));
      } catch (error) {
        console.error("Error parsing stored song:", error);
      }
    }
  }, []);

  // 
  useEffect(() => {
    if(isPlaying){
      localStorage.removeItem("currentSongTime");
    }
  }, [isPlaying])

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
