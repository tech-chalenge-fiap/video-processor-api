import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

import { type ICloudMessaging } from '@/domain'

export class CloudMessagingClient implements ICloudMessaging {
  readonly SQSInstance: SQSClient
  constructor(
    private readonly config: ICloudMessaging.Config
  ) {
    this.SQSInstance = new SQSClient({
      region: this.config.awsRegion
    })
  }

  async send(params: ICloudMessaging.Params): Promise<ICloudMessaging.Result> {
    try {
      const command = new SendMessageCommand({
        QueueUrl: params.QueueUrl,
        MessageBody: params.MessageBody
      })

      const response = await this.SQSInstance.send(command)
      
      if (!response.MessageId) throw new Error(JSON.stringify(response))

      return response.MessageId
    } catch (error) {
      throw new Error(JSON.stringify({ service: 'SQS', queue: params.QueueUrl, error }))
    }
  }
}
