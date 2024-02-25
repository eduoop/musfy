"use client";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  PauseCircle,
  PlayCircle,
  SkipBack,
  SkipForward,
} from "lucide-react";
import { useGlobalCurrentSoundContext } from "../_contexts/CurrentSoundContext";

const MusicPlayer = () => {
  const { setIsPlaying, currentSongUrl, playerRef } =
    useGlobalCurrentSoundContext();

  return (
    currentSongUrl && (
      <div className="w-screen fixed bottom-0 left-0 z-50">
        <AudioPlayer
          autoPlay
          src={currentSongUrl}
          onPlay={(e) => setIsPlaying(true)}
          onPause={(e) => setIsPlaying(false)}
          customAdditionalControls={[]}
          customVolumeControls={[]}
          showSkipControls={true}
          showDownloadProgress={false}
          showJumpControls={false}
          ref={playerRef}
          customIcons={{
            play: <PlayCircle size={30} className="text-primaryOrange" />,
            pause: <PauseCircle size={30} className="text-primaryOrange" />,
            previous: <SkipBack size={30} className="text-primaryOrange" />,
            next: <SkipForward size={30} className="text-primaryOrange" />,
          }}

          // other props here
        />
      </div>
    )
  );
};

export default MusicPlayer;
