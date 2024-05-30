class SoundController {
    private static instance: SoundController;

    private constructor() {}

    public static getInstance(): SoundController {
        if (!SoundController.instance) {
            SoundController.instance = new SoundController();
        }
        return SoundController.instance;
    }

    public playSound(sound: string) {
        let audio = new Audio(sound);
        audio.play();
    }

    public stopSound(sound: string) {
        let audio = new Audio(sound);
        audio.pause();
    }
    public playMusic(music: string) {
        let audio = new Audio(music);
        audio.play();
    }

    public stopMusic(music: string) {
        let audio = new Audio(music);
        audio.pause();
    }

    public setVolume(volume: number) {
        let audio = new Audio();
        audio.volume = volume;
    }

    public mute() {
        let audio = new Audio();
        audio.muted = true;
    }

    public unmute() {
        let audio = new Audio();
        audio.muted = false;
    }
    }
