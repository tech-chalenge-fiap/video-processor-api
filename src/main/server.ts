import 'dotenv/config'
import { VideoProcessorApi } from './config/app'
import { envConfig } from './config'

const api = new VideoProcessorApi()

api.listen(() => {
  process.env.TZ = envConfig.TZ
  // eslint-disable-next-line no-console
  console.log(`Server up and running on 🚪 ${envConfig.PORT}`)
})

export { api }
