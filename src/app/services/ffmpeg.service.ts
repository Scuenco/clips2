import { Injectable, signal } from '@angular/core';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {
  isReady = signal(false);
  ffmpeg = createFFmpeg({ log: true });
  isRunning = signal(false);

  constructor() { }

  async init() {
    if (this.isReady()) return;
    await this.ffmpeg.load();
    this.isReady.set(true); //
  }

  async getScreenshots(file: File | null) {
    if (!file) return [];

    this.isRunning.set(true);

    const data = await fetchFile(file);//will convert file to binary data
    this.ffmpeg.FS('writeFile', file.name, data); //FS: File System

    const seconds = [1, 2, 3];
    const commands: string[] = [];
    seconds.forEach((second) => {
      commands.push(
        // Configure input
        "-i", file.name,
        // Output options
        "-ss", `00:00:0${second}`, //dynamic timestamp
        "-frames:v", "1", //generate a single screenshot
        "-filter:v",
        "scale=510:-1", //width:height; -1 preserve aspect ratio
        // Output
        `output_0${second}.png`
        );
    });

    await this.ffmpeg.run(...commands);

    /* Creating Screenshot URLs */
    const screenshots: string[] = [];

    seconds.forEach((second) => {
      //grab files from FileSystem
      const screenshotFile = this.ffmpeg.FS(//returns binary data
        'readFile',
        `output_0${second}.png`);
      //convert binary data into a blob
      const screenshotBlob = new Blob([screenshotFile.buffer], {
        type: 'image/png',
      });
      //convert blob to url
      const screenshotURL = URL.createObjectURL(screenshotBlob);
      screenshots.push(screenshotURL);
    })
    this.isRunning.set(false);
    return screenshots;
  }
  // create a blob from a URL
  async blobFromURL(url: string) {
    const response = await fetch(url);
    const blob = await response.blob();
    return blob;
  }
}
