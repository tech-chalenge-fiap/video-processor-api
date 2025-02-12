import { UpsertVideoUseCase } from './upsertVideoUseCase'
import { IUpsertVideoRepository, ICloudStorage, ICloudMessaging, IUpsertVideoUseCase } from '@/domain'

jest.mock('@/main/config', () => ({
  envConfig: {
    VIDEO_PROCESSOR_QUEUE_URL: 'https://queue-url.com',
  },
}))

describe('UpsertVideoUseCase', () => {
  let videoRepoMock: jest.Mocked<IUpsertVideoRepository>;
  let cloudStorageMock: jest.Mocked<ICloudStorage>;
  let cloudMessagingMock: jest.Mocked<ICloudMessaging>;
  let upsertVideoUseCase: UpsertVideoUseCase;

  beforeEach(() => {
    videoRepoMock = {
      upsert: jest.fn().mockResolvedValue({
        id: 123,
        user: { email: 'user@example.com' },
        originalName: 'video.mp4',
        fileKey: 'file-key',
        status: 'PENDING',
      }),
    } as jest.Mocked<IUpsertVideoRepository>;
    
    cloudStorageMock = {
      upload: jest.fn().mockResolvedValue('uploaded-file-key'),
      download: jest.fn().mockResolvedValue('uploaded-file-key'),
    } as jest.Mocked<ICloudStorage>;
    
    cloudMessagingMock = {
      send: jest.fn().mockResolvedValue(undefined),
    } as jest.Mocked<ICloudMessaging>;

    upsertVideoUseCase = new UpsertVideoUseCase(videoRepoMock, cloudStorageMock, cloudMessagingMock);
  });

  it('should throw an error if no file is provided', async () => {
    await expect(upsertVideoUseCase.execute({ userId: 123, files: [] }))
      .rejects.toThrow('No file found for upload');
  });

  it('should throw an error if file upload fails', async () => {
    cloudStorageMock.upload.mockResolvedValueOnce('');
    
    const params: IUpsertVideoUseCase.Params = {
      userId: 123,
      files: [{
        fieldname: 'video',
        buffer: Buffer.from('video-buffer'),
        originalname: 'video.mp4',
        mimetype: 'video/mp4',
        encoding: '7bit',
        size: 10,
      }],
    };

    await expect(upsertVideoUseCase.execute(params))
      .rejects.toThrow('Failed to upload file');
  });

  it('should throw an error if videoRepo.upsert fails', async () => {
    videoRepoMock.upsert.mockRejectedValueOnce(new Error('Database error'));
    
    const params: IUpsertVideoUseCase.Params = {
      userId: 123,
      files: [{
        fieldname: 'video',
        buffer: Buffer.from('video-buffer'),
        originalname: 'video.mp4',
        mimetype: 'video/mp4',
        encoding: '7bit',
        size: 10,
      }],
    };
    
    await expect(upsertVideoUseCase.execute(params))
      .rejects.toThrow('Database error');
  });
});