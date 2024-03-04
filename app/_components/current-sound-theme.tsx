"use client";
import React, { useEffect, useState } from "react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";

const CurrentSongTheme = ({ children }: { children: React.ReactNode }) => {
  const { lightenColor, dominantColor, currentSong } =
    useGlobalCurrentSoundContext();

  const [secondaryColor, setSecondaryColor] = useState("#000000");

  useEffect(() => {
    setSecondaryColor(lightenColor(dominantColor, 20));
  }, [dominantColor, lightenColor]);

  function applyOpacityToHexColor(hex: string, opacity: number): string {
    // Convert opacity to a value between 0 and 1
    const normalizedOpacity = Math.min(1, Math.max(0, opacity / 100));
    
    // Extract RGB values from the hex color
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);

    // Return the color with the specified opacity
    return `rgba(${r}, ${g}, ${b}, ${normalizedOpacity})`;
}

  return (
    <div
      style={{
        paddingBottom: "8rem",
        background:
          currentSong &&
          `linear-gradient(to bottom, ${applyOpacityToHexColor(dominantColor, 15)}, transparent)`,
        backgroundSize: "cover",
        minHeight: "100%",
        backgroundBlendMode: "screen"
      }}
      className="relative"
    >
      {children}
    </div>
  );
};

export default CurrentSongTheme;
