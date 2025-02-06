export namespace ICloudMessaging {
  export type Config = {
    awsRegion: string
  }

  export type Params = {
    QueueUrl: string
    MessageBody: string
  }

  export type Result = string
}

export interface ICloudMessaging {
  send: (data: ICloudMessaging.Params) => Promise<ICloudMessaging.Result>
}