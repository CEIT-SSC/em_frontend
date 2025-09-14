"use client";


import {useSound} from "../providers/SoundProvider";
import {Button} from "antd";
import {SoundFilled, SoundOutlined} from "@ant-design/icons";

export function SoundControls() {
  const { toggle, muted, volume, changeVolume } = useSound();

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={toggle}
        className="h-8 w-8"
      >
        {muted ? <SoundOutlined /> : <SoundFilled />}
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
