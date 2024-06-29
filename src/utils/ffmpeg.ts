import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export const loadFFmpeg = async () => {
  ffmpeg = new FFmpeg();
  await ffmpeg.load();
};

export const processVideo = async (file: File, start: number, end: number) => {
  if (!ffmpeg) {
    await loadFFmpeg();
  }
  ffmpeg!.FS('writeFile', 'input.mp4', await fetchFile(file));
  await ffmpeg!.run('-i', 'input.mp4', '-ss', `${start}`, '-to', `${end}`, '-c', 'copy', 'output.mp4');
  const data = ffmpeg!.FS('readFile', 'output.mp4');
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  return url;
};

export const mergeVideos = async (files: File[]) => {
  if (!ffmpeg) {
    await loadFFmpeg();
  }
  await Promise.all(files.map(async (file, index) => {
    await ffmpeg!.FS('writeFile', `input${index}.mp4`, await fetchFile(file));
  }));
  await ffmpeg!.run('-i', `concat:${files.map((_, index) => `input${index}.mp4`).join('|')}`, '-c', 'copy', 'output.mp4');
  const data = ffmpeg!.FS('readFile', 'output.mp4');
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  return url;
};