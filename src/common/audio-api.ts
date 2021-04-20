import { AudioServiceInterface } from "./interfaces/audio.service.interface";

export class AudioAPI implements AudioServiceInterface {
  private audioEl: HTMLAudioElement;

  constructor() {
    this.audioEl = document.createElement("audio");
    this.audioEl.style.display = "none";
    this.audioEl.id = "audio-el";
  }

  get duration() {
    return this.audioEl.duration;
  }

  get currentTime() {
    return this.audioEl.currentTime;
  }

  clear() {
    this.audioEl.src = "";
  }
  async load() {
    this.audioEl.src = "/sample.mp3";
    return new Promise<void>((res) => {
      this.audioEl.oncanplay = () => res();
    });
  }
  async pause() {
    this.audioEl.pause();
  }
  async play() {
    this.audioEl.play();
  }

  onTimeUpdate(callback: (ev: Event) => void): void {
    this.audioEl.ontimeupdate = callback;
  }

  goToTime(time: number) {
    this.audioEl.preload = `${time}`;
  }
}