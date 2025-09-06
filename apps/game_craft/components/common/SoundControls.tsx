"use client";

import { useSound } from "@/components/providers/SoundProvider";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX } from "lucide-react";

export function SoundControls() {
  const { toggle, muted, volume, changeVolume } = useSound();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggle}
        className="h-8 w-8"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => changeVolume(parseFloat(e.target.value))}
        className="w-20"
        disabled={muted}
      />
    </div>
  );
}
