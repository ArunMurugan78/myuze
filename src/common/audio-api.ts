import { AudioServiceInterface } from "./interfaces/audio.service.interface";

export class AudioAPI implements AudioServiceInterface {
  private audioEl: HTMLAudioElement;
  private interval: any;

  constructor() {
    this.audioEl = document.createElement("audio");
  }

  get duration() {
    return this.audioEl.duration;
  }

  get currentTime() {
    return this.audioEl.currentTime;
  }

  isPlaying(): boolean {
    return !this.audioEl.paused && !this.audioEl.ended;
  }

  clear() {
    clearInterval(this.interval);
    this.audioEl.src = "";
  }

  async load(dataURL: string) {
    this.audioEl.src = dataURL;
    return new Promise<void>((res) => {
      this.audioEl.oncanplay = () => res();
    });
  }

  onLoad(callback: () => void) {
    this.audioEl.addEventListener("canplay", () => callback());
  }

  async pause() {
    this.audioEl.pause();
  }
  async play() {
    this.audioEl.play();
  }

  onTimeUpdate(callback: (currentTime: number) => void): void {
    this.interval = setInterval(() => {
      if (this.audioEl.paused || this.audioEl.ended) {
        return;
      }
      callback(this.audioEl.currentTime);
    }, 100);
  }

  removeTimeUpdateListener() {
    clearInterval(this.interval);
  }

  goToTime(timeInSeconds: number) {
    this.audioEl.currentTime = timeInSeconds;
  }

  onPlay(callback: () => void) {
    this.audioEl.addEventListener("play", () => callback());
  }

  onPause(callback: () => void) {
    this.audioEl.addEventListener("pause", () => callback());
  }
}
