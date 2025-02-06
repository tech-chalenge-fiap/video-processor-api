import { IHttpRequest, IHttpResponse, HttpClient } from '@/domain/protocols'
import axios, { AxiosResponse } from 'axios'

export class HttpClientAdapter implements HttpClient {
  async request(data: IHttpRequest): Promise<IHttpResponse> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
        responseType: data.responseType,
        timeout: data.timeout ?? undefined
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      axiosResponse = error.response
    }
    if (axiosResponse && !axiosResponse.status) {
      axiosResponse.status = 500
    }
    if (!axiosResponse) {
      axiosResponse = {
        status: 500,
        data: {
          errors: ['no data returned', data.url]
        },
        error: {
          errors: ['no data returned', data.url]
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}
