import { useGlobalCurrentSoundContext } from "@/app/_contexts/CurrentSoundContext";

const useCurrentSoundUrl = () => {
  const { currentSongUrl, setCurrentSongUrl, setIsPlaying, isPlaying } = useGlobalCurrentSoundContext();

  const updateCurrentSoundUrl = (newUrl?: string) => {
    if (newUrl && newUrl !== currentSongUrl) {
      setCurrentSongUrl(newUrl);
      setIsPlaying(true)
    }
  };

  const isCurrentSong = (url: string): boolean => {
    return url === currentSongUrl;
  };

  const isCurrentSongAndIsPlaying = (url: string): boolean => {
    return url === currentSongUrl && isPlaying;
  };

  return { updateCurrentSoundUrl, isCurrentSong, isCurrentSongAndIsPlaying };
};

export default useCurrentSoundUrl;