"use client";
import { Maximize2, PlayIcon } from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";
import React, { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

interface FullScreenMusicProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const FullScreenMusic = ({
  isFullScreen,
  toggleFullScreen,
}: FullScreenMusicProps) => {
  const { currentSong } = useGlobalCurrentSoundContext();
  const [dominantColor, setDominantColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const fac = new FastAverageColor();

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

  console.log(dominantColor);

  return (
    <div id="full-screen-music">
      {!isFullScreen ? (
        <Maximize2
          onClick={toggleFullScreen}
          key="fullscreen_icon"
          className="cursor-pointer"
          size={20}
        />
      ) : (
        <div
          style={{
            background: `linear-gradient(to top, ${dominantColor}, ${secondaryColor})`,
          }}
          className={`h-full w-full`}
        ></div>
      )}
    </div>
  );
};

export default FullScreenMusic;
