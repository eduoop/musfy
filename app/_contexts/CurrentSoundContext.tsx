"use client";

import { Music } from "@prisma/client";
import { FastAverageColor } from "fast-average-color";
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
  dominantColor: string;
  secondaryColor: string;
  lightenColor: (colorHex: string, percentage?: number) => string;
}

const GlobalContext = createContext<CurrentSoundUrlProps>(null!);

export const CurrentSoundContextProvider = ({
  children,
}: {
  children: any;
}) => {
  const [currentSong, setCurrentSong] = useState<Music>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [dominantColor, setDominantColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const playerRef = useRef<any>();
  const fac = new FastAverageColor();

  const getImageData = async () => {
    if (currentSong) {
      const color = await fac.getColorAsync(currentSong.imageUrl);
      setDominantColor(color.hex);
      setSecondaryColor(lightenColor(color.hex));
    }
  };

  const lightenColor = (colorHex: string, percentage = 15) => {
    let c = colorHex.replace("#", "");
    let int_r = parseInt(c.substring(0, 2), 16);
    let int_g = parseInt(c.substring(2, 4), 16);
    let int_b = parseInt(c.substring(4, 6), 16);

    if (int_r > 127) int_r += Math.round(-2.55 * percentage);
    else int_r -= Math.round(2.55 * percentage);

    if (int_g > 127) int_g += Math.round(-2.55 * percentage);
    else int_g -= Math.round(2.55 * percentage);

    if (int_b > 127) int_b += Math.round(-2.55 * percentage);
    else int_b -= Math.round(2.55 * percentage);

    int_r = Math.max(0, Math.min(int_r, 255));
    int_g = Math.max(0, Math.min(int_g, 255));
    int_b = Math.max(0, Math.min(int_b, 255));

    return (
      "#" +
      ((1 << 24) + (int_r << 16) + (int_g << 8) + int_b).toString(16).slice(1)
    );
  };

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
    getImageData();

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
    if (isPlaying) {
      localStorage.removeItem("currentSongTime");
    }
  }, [isPlaying]);

  return (
    <GlobalContext.Provider
      value={{
        currentSong,
        setCurrentSong,
        isPlaying,
        setIsPlaying,
        playerRef,
        toggleIsPlaying,
        dominantColor,
        secondaryColor,
        lightenColor
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalCurrentSoundContext = () => useContext(GlobalContext);
