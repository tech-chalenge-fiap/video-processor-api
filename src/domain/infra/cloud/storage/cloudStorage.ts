export interface ICloudStorage { 
  upload: (file: Buffer, key: string) => Promise<string>
  download: (key: string) => Promise<Buffer>
}