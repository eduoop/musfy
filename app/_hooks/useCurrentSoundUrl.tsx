import { useGlobalCurrentSoundContext } from "@/app/_contexts/CurrentSoundContext";

const useCurrentSoundUrl = () => {
  const { currentSongUrl, setCurrentSongUrl } = useGlobalCurrentSoundContext();

  const updateCurrentSoundUrl = (newUrl?: string) => {
    if (newUrl && newUrl !== currentSongUrl) {
      setCurrentSongUrl(newUrl);
    }
  };

  const isCurrentSong = (url: string): boolean => {
    return url === currentSongUrl;
  };

  return { currentSongUrl, updateCurrentSoundUrl, isCurrentSong };
};

export default useCurrentSoundUrl;