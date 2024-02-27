import { useGlobalCurrentSoundContext } from "@/app/_contexts/CurrentSoundContext";
import { Music } from "@prisma/client";

const useCurrentSoundUrl = () => {
  const { currentSong, setCurrentSong, setIsPlaying, isPlaying } = useGlobalCurrentSoundContext();

  const updateCurrentSoundUrl = (newSong?: Music) => {
    if (newSong && newSong.url !== currentSong?.url) {
      setCurrentSong(newSong);
      setIsPlaying(true)
    }
  };

  const isCurrentSong = (url: string): boolean => {
    return url === currentSong?.url;
  };

  const isCurrentSongAndIsPlaying = (url: string): boolean => {
    return url === currentSong?.url && isPlaying;
  };

  return { updateCurrentSoundUrl, isCurrentSong, isCurrentSongAndIsPlaying };
};

export default useCurrentSoundUrl;