"use client";
import React, { MutableRefObject, useEffect } from "react";

interface FullScreenMusicProps {
  isFullScreen: boolean;
  toggleFullScreen: () => void;
}

const FullScreenMusic = ({
  isFullScreen,
  toggleFullScreen,
}: FullScreenMusicProps) => {
  return (
    <div id="full-screen-music">
      <button onClick={toggleFullScreen}>
        {isFullScreen ? "true" : "false"}
      </button>
    </div>
  );
};

export default FullScreenMusic;
