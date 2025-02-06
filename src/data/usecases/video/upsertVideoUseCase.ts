import { IUpsertVideoUseCase, IUpsertVideoRepository, ICloudStorage, ICloudMessaging, IFileUploadParams } from '@/domain'
import { envConfig } from '@/main/config'

export class UpsertVideoUseCase implements IUpsertVideoUseCase {
  constructor(
    private readonly videoRepo: IUpsertVideoRepository,
    private readonly cloudStorage: ICloudStorage,
    private readonly cloudMessaging: ICloudMessaging
  ) { }

  async execute(params: IUpsertVideoUseCase.Params): Promise<IUpsertVideoUseCase.Result> {
    const { userId, files } = params

    const file = files?.find(file => file.fieldname === 'video')


    if (!file) throw new Error('No file found for upload')
    
    const fileKey = this.generateFileKey(file)

    console.log(fileKey)
    
    const uploadedKey = await this.cloudStorage.upload(file.buffer, fileKey)

    if (!uploadedKey) throw new Error('Failed to upload file')

    const video = await this.videoRepo.upsert({
      userId,
      status: "PENDING",
      originalname: file.originalname,
      fileKey: uploadedKey
    })

    await this.cloudMessaging.send({
      MessageBody: JSON.stringify({
        videoId: String(video?.id)
      }),
      QueueUrl: envConfig.VIDEO_PROCESSOR_QUEUE_URL
    })

    return video
  }
  generateFileKey = (file: IFileUploadParams): string => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const uuid = crypto.randomUUID()
    const extension = file.mimetype.split('/').pop()

    return `${year}/${month}/${day}/${uuid}.${extension}`
  }
}