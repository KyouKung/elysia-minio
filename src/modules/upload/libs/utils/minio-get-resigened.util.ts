import { createStorageFromEnv } from '../../factories/storage-factory'
const storage = createStorageFromEnv()

export async function minioGetPresignedUrl(
  filePath: string,
  expiration: number,
): Promise<string> {
  const url = await storage.getPresignedUrl!(filePath, expiration)

  return url
}
