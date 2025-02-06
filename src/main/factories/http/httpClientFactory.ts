import { HttpClient } from '@/domain/protocols'
import { HttpClientAdapter } from '@/infra/adapters'

export const makeHttpClient = (): HttpClient => new HttpClientAdapter()
