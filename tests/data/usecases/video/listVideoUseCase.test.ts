import { ListVideoUseCase } from '@/data/usecases'
import { IListVideoRepository } from '@/domain'

describe('ListVideoUseCase', () => {
  let listVideoUseCase: ListVideoUseCase
  let videoRepo: jest.Mocked<IListVideoRepository>

  beforeEach(() => {
    videoRepo = {
      list: jest.fn()
    }
    listVideoUseCase = new ListVideoUseCase(videoRepo)
  })

  it('should call videoRepo.list with correct userId', async () => {
    const params = { userId: 123 }
    await listVideoUseCase.execute(params)
    
    expect(videoRepo.list).toHaveBeenCalledWith(params)
    expect(videoRepo.list).toHaveBeenCalledTimes(1)
  })

  it('should return the list of videos from videoRepo', async () => { 
  const videoListMock = [
    { id: 1, title: 'Video 1', status: '', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, title: 'Video 2', status: '', createdAt: new Date(), updatedAt: new Date() }
  ]
  
  videoRepo.list.mockResolvedValue(videoListMock)

  const result = await listVideoUseCase.execute({ userId: 123 })
  
  expect(result).toEqual(videoListMock)
})


  it('should throw if videoRepo.list throws', async () => {
    videoRepo.list.mockRejectedValue(new Error('Database error'))

    await expect(listVideoUseCase.execute({ userId: 123 }))
      .rejects
      .toThrow('Database error')
  })
})
