export interface FileStorage {
  uploadOne(
    file: File,
    subFolder: string,
    organizationId: number,
  ): Promise<{
    originalName: string
    fileUrl: string
    fileType: string
    filePath: string
  }>

  uploadMany(
    files: File[],
    subFolder: string,
    organizationId: number,
  ): Promise<
    {
      originalName: string
      fileUrl: string
      fileType: string
      filePath: string
    }[]
  >
}
