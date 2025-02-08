import { UpsertVideoUseCase } from '@/data/usecases/video'
import { IUpsertVideoRepository, ICloudStorage, ICloudMessaging } from '@/domain'
import { envConfig } from '@/main/config'
import { jest } from '@jest/globals';

const mockVideoRepo: jest.Mocked<IUpsertVideoRepository> = {
  upsert: jest.fn()
}

const mockCloudStorage: jest.Mocked<ICloudStorage> = {
  upload: jest.fn(),
  download: jest.fn(),
}

const mockCloudMessaging: jest.Mocked<ICloudMessaging> = {
  send: jest.fn()
}

describe('UpsertVideoUseCase', () => {
  let upsertVideoUseCase: UpsertVideoUseCase

  beforeEach(() => {
    jest.clearAllMocks()
    upsertVideoUseCase = new UpsertVideoUseCase(mockVideoRepo, mockCloudStorage, mockCloudMessaging)
  })

  it('should throw an error if no file is provided', async () => {
    await expect(upsertVideoUseCase.execute({ userId: 123, files: [] }))
      .rejects.toThrow('No file found for upload')
  })

  it('should generate a file key and upload the file', async () => {
    const mockFile = {
      fieldname: 'video',
      buffer: Buffer.from('test'),
      mimetype: 'video/mp4',
      originalname: 'video.mp4',
      encoding: '7bit',
      size: 1000000,
    }

    mockCloudStorage.upload.mockResolvedValue('uploaded-file-key')
    mockVideoRepo.upsert.mockResolvedValue({ id: 123, status: '', fileKey: "" })

    await upsertVideoUseCase.execute({ userId: 123, files: [mockFile] })

    expect(mockCloudStorage.upload).toHaveBeenCalled()
  })

  it('should throw an error if file upload fails', async () => {
    const mockFile = {
      fieldname: 'video',
      buffer: Buffer.from('test'),
      mimetype: 'video/mp4',
      originalname: 'video.mp4',
      encoding: '7bit',
      size: 1000000,
    }

    mockCloudStorage.upload.mockRejectedValue(new Error('Upload failed'));

    await expect(upsertVideoUseCase.execute({ userId: 123, files: [mockFile] }))
    .rejects.toThrow('Failed to upload file');
  })

  it('should upsert the video in the repository', async () => {
    const mockFile = {
      fieldname: 'video',
      buffer: Buffer.from('test'),
      mimetype: 'video/mp4',
      originalname: 'video.mp4',
      encoding: '7bit',
      size: 1000000,
    }

    mockCloudStorage.upload.mockResolvedValue('uploaded-file-key')
    mockVideoRepo.upsert.mockResolvedValue({ id: 123, status: '', fileKey: "" })

    await upsertVideoUseCase.execute({ userId: 123, files: [mockFile] })

    expect(mockVideoRepo.upsert).toHaveBeenCalledWith({
      userId: '123',
      status: 'PENDING',
      originalname: 'video.mp4',
      fileKey: 'uploaded-file-key'
    })
  })

  it('should send a message to the queue', async () => {
    const mockFile = {
      fieldname: 'video',
      buffer: Buffer.from('test'),
      mimetype: 'video/mp4',
      originalname: 'video.mp4',
      encoding: '7bit',
      size: 1000000,
    }

    mockCloudStorage.upload.mockResolvedValue('uploaded-file-key')
    mockVideoRepo.upsert.mockResolvedValue({ id: 123, status: '', fileKey: "" })

    await upsertVideoUseCase.execute({ userId: 123, files: [mockFile] })

    expect(mockCloudMessaging.send).toHaveBeenCalledWith({
      MessageBody: JSON.stringify({ videoId: 456 }),
      QueueUrl: envConfig.VIDEO_PROCESSOR_QUEUE_URL
    })
  })
})
