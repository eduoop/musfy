"use client";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  Fullscreen,
  Maximize,
  Maximize2,
  PauseIcon,
  PlayIcon,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";
import { useEffect, useState } from "react";
import FullScreenMusic from "./full-screen-music";

const MusicPlayer = () => {
  const { setIsPlaying, currentSongUrl, playerRef } =
    useGlobalCurrentSoundContext();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const element = document.getElementById('full-screen-music');
    const handleFullScreenChange = () => {
      setIsFullScreen((prevState) => {
        return document.fullscreenElement === element; // Verifica se o elemento está em fullscreen
      });
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    const element = document.getElementById('full-screen-music');
    if (!element?.requestFullscreen) {
      throw new Error('Browser does not support fullscreen!');
    }

    element.requestFullscreen().catch(() => {});
  };

  return (
    currentSongUrl && (
      <div className="w-screen fixed bottom-0 left-0 z-50 flex items-center justify-center bg-black py-1">
        <AudioPlayer
          autoPlay
          src={currentSongUrl}
          layout="stacked-reverse"
          onPlay={(e) => setIsPlaying(true)}
          onPause={(e) => setIsPlaying(false)}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          showSkipControls={true}
          showDownloadProgress={false}
          className="w-[90%] "
          showJumpControls={false}
          ref={playerRef}
          customControlsSection={[
            RHAP_UI.ADDITIONAL_CONTROLS,
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME_CONTROLS,
            <Maximize2
              onClick={toggleFullScreen}
              key="fullscreen_icon"
              className="cursor-pointer"
              size={26}
            />,
          ]}
          customIcons={{
            play: <PlayIcon size={30} className="text-white fill-white" />,
            pause: <PauseIcon size={30} className="text-white fill-white" />,
            previous: <SkipBack size={25} className="text-white" />,
            next: <SkipForward size={25} className="text-white" />,
          }}
        />
        <FullScreenMusic isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen}/>
      </div>
    )
  );
};

export default MusicPlayer;
