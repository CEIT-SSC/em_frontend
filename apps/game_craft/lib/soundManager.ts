import { Howl, Howler } from "howler";

// List of available sounds
export type SoundKey = "coin" | "jump";

// Store all sounds in one place
const sounds: Record<SoundKey, Howl> = {
    coin: new Howl({
        src: ["/sound/super-mario-coin-sound.mp3"],
        volume: 0.3,
        preload: true,
        html5: true,
        onloaderror: (id, error) => {
            console.error(`Failed to load hover sound:`, error);
        },
        onplayerror: (id, error) => {
            console.error(`Failed to play hover sound:`, error);
        }
    }),
    jump: new Howl({
        src: ["/sound/super-mario-jump-sound.mp3"],
        volume: 0.3,
        preload: true,
        html5: true,
        onloaderror: (id, error) => {
            console.error(`Failed to load hover sound:`, error);
        },
        onplayerror: (id, error) => {
            console.error(`Failed to play hover sound:`, error);
        }
    }),
};

export const playSound = (key: SoundKey): void => {
    try {
        const sound = sounds[key];
        if (sound) {
            // Check if the sound is ready to play
            if (sound.state() === 'loaded') {
                sound.stop(); // reset if needed
                sound.play();
            } else {
                console.warn(`Sound "${key}" is not loaded yet`);
            }
        }
    } catch (error) {
        console.error(`Error playing sound "${key}":`, error);
    }
};

export const setGlobalVolume = (vol: number): void => {
    Howler.volume(vol); // 0.0 - 1.0
};

export const toggleMute = (mute: boolean): void => {
    Howler.mute(mute);
};
