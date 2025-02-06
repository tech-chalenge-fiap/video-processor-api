import { ICloudStorage } from "@/domain";
import { envConfig } from "@/main/config";
import AWS from "aws-sdk";

export class CloudStorageClient implements ICloudStorage {
  private readonly s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: envConfig.CLOUD_ACCESS_KEY,
      secretAccessKey: envConfig.CLOUD_SECRET_KEY,
    })
  }

  async upload(file: Buffer, key: string): Promise<string> {
    const params = {
      Bucket: envConfig.CLOUD_STORAGE_BUCKET!,
      Key: key,
      Body: file,
    };
    await this.s3.upload(params).promise()
    return key
  }

  async download(key: string): Promise<Buffer> {
    const params = {
      Bucket: envConfig.CLOUD_STORAGE_BUCKET!,
      Key: key,
    }
    const data = await this.s3.getObject(params).promise()
    return data.Body as Buffer
  }
}