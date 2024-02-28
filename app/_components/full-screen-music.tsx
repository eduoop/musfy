"use client";
import { Maximize2, PlayIcon } from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";
import React, { useEffect, useState, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import MusicPlayer from "./player";
interface FullScreenMusicProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const FullScreenMusic = ({
  isFullScreen,
  toggleFullScreen,
}: FullScreenMusicProps) => {
  const { currentSong, toggleIsPlaying, playerRef } = useGlobalCurrentSoundContext();
  const [dominantColor, setDominantColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const fac = new FastAverageColor();

  const [springsImage, apiImage] = useSpring(() => ({
    from: { x: -100 },
  }));

  const [springsText, apiText] = useSpring(() => ({
    from: { y: -100 },
  }));

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

  const getImageData = async () => {
    const color = await fac.getColorAsync(currentSong!.imageUrl);
    setDominantColor(color.hex);
    setSecondaryColor(lightenColor(color.hex));
  };

  useEffect(() => {
    getImageData();
  });

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
                  <h1 className="text-5xl font-semibold mb-2">
                    {currentSong!.title}
                  </h1>
                  <small className="font-semibold text-lg">
                    {currentSong!.author ? currentSong!.author : "Anônimo"}
                  </small>
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
