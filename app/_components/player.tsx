"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  PauseCircle,
  PauseIcon,
  PlayCircle,
  PlayIcon,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";

const MusicPlayer = () => {
  const { setIsPlaying, currentSongUrl, playerRef } =
    useGlobalCurrentSoundContext();

  return (
    currentSongUrl && (
      <div className="w-screen fixed bottom-0 left-0 z-50 flex items-center justify-center bg-black py-2">
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
          customIcons={{
            play: <PlayIcon size={30} className="text-white fill-white" />,
            pause: <PauseIcon size={30} className="text-white fill-white" />,
            previous: <SkipBack size={25} className="text-white" />,
            next: <SkipForward size={25} className="text-white" />,
          }}

          // other props here
        />
      </div>
    )
  );
};

export default MusicPlayer;
