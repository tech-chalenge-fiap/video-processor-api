import { ICloudMessaging } from "@/domain"
import { CloudMessagingClient } from "@/infra/cloud"
import { envConfig } from "@/main/config"

export const makeCloudMessagingClient = (): ICloudMessaging => {
  return new CloudMessagingClient({
    awsRegion: envConfig.CLOUD_REGION
  })
}
