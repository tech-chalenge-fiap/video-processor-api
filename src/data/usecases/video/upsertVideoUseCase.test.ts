import { UpsertVideoUseCase } from './upsertVideoUseCase'
import { IUpsertVideoRepository, ICloudStorage, ICloudMessaging } from '@/domain'
import { envConfig } from '@/main/config'

// Mocks
jest.mock('@/main/config', () => ({
  envConfig: {
    VIDEO_PROCESSOR_QUEUE_URL: 'https://queue-url.com',
  },
}))

describe('UpsertVideoUseCase', () => {
  let videoRepoMock: IUpsertVideoRepository
  let cloudStorageMock: ICloudStorage
  let cloudMessagingMock: ICloudMessaging
  let upsertVideoUseCase: UpsertVideoUseCase

  beforeEach(() => {
    videoRepoMock = {
      upsert: jest.fn().mockResolvedValue({
        id: 123,
        user: { email: 'user@example.com' },
        originalName: 'video.mp4',
        fileKey: 'file-key',
        status: 'PENDING',
      }),
    }
    
    cloudStorageMock = {
      upload: jest.fn().mockResolvedValue('uploaded-file-key'),
    }
    
    cloudMessagingMock = {
      send: jest.fn().mockResolvedValue(null),
    }

    upsertVideoUseCase = new UpsertVideoUseCase(videoRepoMock, cloudStorageMock, cloudMessagingMock)
  })

  it('should successfully upload and process video', async () => {
    const params = {
      userId: 'user123',
      files: [
        {
          fieldname: 'video',
          buffer: Buffer.from('video-buffer'),
          originalname: 'video.mp4',
          mimetype: 'video/mp4',
        },
      ],
    }

    const result = await upsertVideoUseCase.execute(params)

    // Check if cloud storage upload was called correctly
    expect(cloudStorageMock.upload).toHaveBeenCalledWith(params.files[0].buffer, expect.stringContaining('.mp4'))

    // Check if videoRepo.upsert was called with correct parameters
    expect(videoRepoMock.upsert).toHaveBeenCalledWith({
      userId: params.userId,
      status: 'PENDING',
      originalname: 'video.mp4',
      fileKey: 'uploaded-file-key',
    })

    // Check if cloudMessaging.send was called correctly
    expect(cloudMessagingMock.send).toHaveBeenCalledWith({
      MessageBody: JSON.stringify({
        videoId: '123',
        fileKey: 'uploaded-file-key',
        email: 'user@example.com',
        fileName: 'video.mp4',
      }),
      QueueUrl: envConfig.VIDEO_PROCESSOR_QUEUE_URL,
    })

    // Check if the result matches the expected upserted video
    expect(result).toEqual({
      id: 123,
      user: { email: 'user@example.com' },
      originalName: 'video.mp4',
      fileKey: 'file-key',
      status: 'PENDING',
    })
  })
})
