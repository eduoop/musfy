"use client";
import { Maximize2, PauseIcon, PlayIcon } from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";
import React, { useEffect, useState, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import MusicPlayer from "./player";
import { Button } from "./ui/button";
import useCurrentSoundUrl from "../_hooks/useCurrentSoundUrl";
interface FullScreenMusicProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
  musicUrl: string;
}

const FullScreenMusic = ({
  isFullScreen,
  toggleFullScreen,
  musicUrl,
}: FullScreenMusicProps) => {
  
  const { currentSong, toggleIsPlaying, lightenColor, dominantColor } =
    useGlobalCurrentSoundContext();
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [isUserActive, setIsUserActive] = useState(true);
  const { isCurrentSongAndIsPlaying, isCurrentSong } =
    useCurrentSoundUrl();

  const [springsImage, apiImage] = useSpring(() => ({
    from: { x: -100 },
  }));

  const [springsText, apiText] = useSpring(() => ({
    from: { y: -100 },
  }));

  useEffect(() => {
    setSecondaryColor(lightenColor(dominantColor));
  }, [dominantColor, lightenColor]);

  useEffect(() => {
    if (isFullScreen) {
      apiImage.start({
        from: {
          x: -100,
        },
        to: {
          x: 0,
        },
      });

      apiText.start({
        from: {
          y: -100,
        },
        to: {
          y: 0,
        },
      });
    }
  }, [apiImage, apiText, isFullScreen]);

  useEffect(() => {
    let timer: any;
    const setInactive = () => {
      setIsUserActive(false);
    };

    document.addEventListener('mousemove', () => {
      setIsUserActive(true);
      clearTimeout(timer);
      timer = setTimeout(setInactive, 3000); // 3000 milissegundos = 3 segundos
    });

    return () => {
      document.removeEventListener('mousemove', () => {
        clearTimeout(timer);
      });
    };
  }, []);

  return (
    <div id="full-screen-music">
      {!isFullScreen ? (
        <>
          <Maximize2
            onClick={toggleFullScreen}
            key="fullscreen_icon"
            className="cursor-pointer"
            size={20}
          />
        </>
      ) : (
        <div className="h-full relative">
          <div
            onClick={() => toggleIsPlaying(currentSong!.url)}
            style={{
              background: `linear-gradient(to top, ${dominantColor}, ${secondaryColor})`,
            }}
            className={`absolute h-full w-full flex items-end pl-28 pb-28 select-none`}
          >
            <div className="z-50 flex flex-col">
              <div className="flex gap-8 items-end">
                <animated.div
                  className="relative w-[180px] h-[180px]"
                  style={{
                    ...springsImage,
                  }}
                >
                  <Image
                    alt="Music image"
                    src={currentSong!.imageUrl}
                    fill
                    sizes="100vw"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </animated.div>

                <animated.div
                  style={{
                    ...springsText,
                  }}
                >
                  {isCurrentSong(musicUrl) &&
                    (isCurrentSongAndIsPlaying(musicUrl) ? (
                      <Button
                        onClick={() => toggleIsPlaying(musicUrl)}
                        className={`rounded-full bg-transparent cursor-pointer p-0 hover:bg-transparent duration-300 opacity-${isUserActive ? "100" : "0"}`}
                      >
                        <PauseIcon
                          className="text-white fill-white"
                          size={50}
                        />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => toggleIsPlaying(musicUrl)}
                        className={`rounded-full bg-transparent cursor-pointer p-0 hover:bg-transparent duration-1000 opacity-${isUserActive ? "100" : "0"}`}
                      >
                        <PlayIcon
                          className="text-white ml-[3px] fill-white"
                          size={50}
                        />
                      </Button>
                    ))}
                    
                  <div>
                    <h1 className="text-5xl font-bold mb-2 mt-5">
                      {currentSong!.title}
                    </h1>
                    <small className="font-semibold text-lg">
                      {currentSong!.author ? currentSong!.author : "Anônimo"}
                    </small>
                  </div>
                </animated.div>
              </div>

              {/* TODO rendering de player here */}
              {/* <div>
                <MusicPlayer ref={playerRef}/>
              </div> */}
            </div>
          </div>

          <Image
            src={currentSong!.imageUrl}
            alt="fullscrean background"
            onClick={() => toggleIsPlaying(currentSong!.url)}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="absolute backdrop-blur-xl inset-0 opacity-5 pointer-events-none"
          />
        </div>
      )}
    </div>
  );
};

export default FullScreenMusic;
