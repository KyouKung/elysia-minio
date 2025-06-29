export interface FileStorage {
  uploadOne(
    file: File,
    organizationId: string,
    subFolder?: string,
  ): Promise<UploadedFile>
  uploadMany(
    files: File[],
    organizationId: string,
    subFolder?: string,
  ): Promise<UploadedFile[]>
  getPresignedUrl?(filePath: string, expiration: number): Promise<string>
}

export interface UploadedFile {
  originalName: string
  fileUrl: string
  fileType: string
  filePath: string
}
