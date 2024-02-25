"use client"

import { createContext, useContext, useState } from "react";

interface CurrentSoundUrlProps {
    currentSongUrl: string;
    setCurrentSongUrl: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = createContext<CurrentSoundUrlProps>(null!)

export const CurrentSoundContextProvider = ({ children }: { children: any }) => {
    const [currentSongUrl, setCurrentSongUrl] = useState("")

    console.log(currentSongUrl)

    return (
        <GlobalContext.Provider value={{ currentSongUrl, setCurrentSongUrl }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalCurrentSoundContext = () => useContext(GlobalContext);
