declare module '@ffmpeg/ffmpeg' {
    export function createFFmpeg(options?: any): FFmpeg;
    export function fetchFile(file: File | string): Promise<Uint8Array>;
    
    export interface FFmpeg {
      load(): Promise<void>;
      FS(method: string, ...args: any[]): any;
      run(...args: string[]): Promise<void>;
    }
  }