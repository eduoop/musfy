import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./_providers/auth";
import Header from "./_components/header";
import { Toaster } from "./_components/ui/toaster";
import { CurrentSoundContextProvider } from "./_contexts/CurrentSoundContext";
import MusicPlayer from "./_components/player";
import CurrentSongTheme from "./_components/current-sound-theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musfy",
  description: "Your music application :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <AuthProvider>
          <CurrentSoundContextProvider>
            <Header />
            <CurrentSongTheme>{children}</CurrentSongTheme>
            <MusicPlayer />
            <Toaster />
          </CurrentSoundContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
