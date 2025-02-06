import { ICloudStorage } from "@/domain"
import { CloudStorageClient } from "@/infra/cloud"

export const makeCloudStorageClient = (): ICloudStorage => {
  return new CloudStorageClient()
}
