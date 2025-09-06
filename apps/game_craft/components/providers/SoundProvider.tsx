"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import {
  playSound as play,
  setGlobalVolume,
  toggleMute as toggleHowlerMute,
  SoundKey,
} from "@/lib/soundManager";

type SoundContextType = {
  playSound: (key: SoundKey) => void;
  toggle: () => void;
  muted: boolean;
  volume: number;
  changeVolume: (v: number) => void;
  audioEnabled: boolean;
};

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Enable audio on first user interaction
  useEffect(() => {
    const enableAudio = () => {
      setAudioEnabled(true);
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("keydown", enableAudio);
    };

    document.addEventListener("click", enableAudio);
    document.addEventListener("touchstart", enableAudio);
    document.addEventListener("keydown", enableAudio);

    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("keydown", enableAudio);
    };
  }, []);

  const playSound = useCallback(
    (key: SoundKey) => {
      if (audioEnabled && !muted) {
        play(key);
      }
    },
    [audioEnabled, muted]
  );

  const toggle = useCallback(() => {
    const newMute = !muted;
    setMuted(newMute);
    toggleHowlerMute(newMute);
  }, [muted]);

  const changeVolume = useCallback((v: number) => {
    setVolume(v);
    setGlobalVolume(v);
  }, []);

  return (
    <SoundContext.Provider
      value={{ playSound, toggle, muted, volume, changeVolume, audioEnabled }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used inside SoundProvider");
  return ctx;
}
