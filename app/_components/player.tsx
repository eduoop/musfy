"use client";

import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  PauseIcon,
  PlayIcon,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";
import { useEffect, useState } from "react";
import FullScreenMusic from "./full-screen-music";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";

const MusicPlayer = () => {
  const { setIsPlaying, currentSong, playerRef } =
    useGlobalCurrentSoundContext();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const element = document.getElementById("full-screen-music");
    const handleFullScreenChange = () => {
      setIsFullScreen((prevState) => {
        console.log(prevState);
        return !(document.fullscreenElement === element); // Verifica se o elemento está em fullscreen
      });
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    const element = document.getElementById("full-screen-music");
    if (!element?.requestFullscreen) {
      throw new Error("Browser does not support fullscreen!");
    }

    element.requestFullscreen().catch(() => {});
  };

  const refersh = () => {}

  useEffect(() => {
    const storedSongTime = localStorage.getItem("currentSongTime");

    if (storedSongTime && playerRef.current) {
      try {
        playerRef.current.audio.current.currentTime = storedSongTime;
        refersh()
      } catch (error) {
        console.error("Error parsing stored song time:", error);
      }
    }
  }, [playerRef.current, refersh]);

  return (
    currentSong && (
      <div className="w-screen fixed bottom-0 left-0 z-50 flex items-center justify-center bg-black py-1">
        <div className="w-full relative flex justify-center">
          <AudioPlayer
            autoPlay
            src={currentSong.url}
            layout="stacked-reverse"
            onPlay={(e) => setIsPlaying(true)}
            onPause={(e) => setIsPlaying(false)}
            customAdditionalControls={[]}
            customVolumeControls={[]}
            showSkipControls={true}
            showDownloadProgress={false}
            className="w-[90%] md:w-[50%] "
            showJumpControls={false}
            ref={playerRef}
            customControlsSection={[
              RHAP_UI.ADDITIONAL_CONTROLS,
              RHAP_UI.MAIN_CONTROLS,
              RHAP_UI.VOLUME_CONTROLS,
            ]}
            customIcons={{
              play: <PlayIcon size={30} className="text-white fill-white" />,
              pause: <PauseIcon size={30} className="text-white fill-white" />,
              previous: <SkipBack size={25} className="text-white" />,
              next: <SkipForward size={25} className="text-white" />,
            }}
          />

          <div className="hidden md:block absolute right-20 bottom-[50%] translate-y-[50%]">
            <FullScreenMusic
              isFullScreen={isFullScreen}
              toggleFullScreen={toggleFullScreen}
              key={"isFullScreen"}
              musicUrl={currentSong.url}
            />
          </div>

          <div className="hidden md:flex absolute left-5 bottom-[50%] items-center gap-3 translate-y-[50%]  ">
            <div className="relative w-14 h-14">
              <Image
                alt="Music image"
                src={currentSong!.imageUrl}
                fill
                sizes="100vw"
                className="absolute inset-0 pointer-events-none rounded-md"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h1 className="font-semibold">{currentSong.title}</h1>
              <small>
                {currentSong.author ? currentSong.author : "Anônimo"}
              </small>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MusicPlayer;
