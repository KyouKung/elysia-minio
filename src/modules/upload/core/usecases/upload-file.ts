import { FileStorage } from '../ports/file-storage'

export interface UploadFileRequest {
  file: File
  subFolder: string
  organizationId: number
}

export interface UploadFilesRequest {
  files: File[]
  subFolder: string
  organizationId: number
}

export interface UploadFileResponse {
  originalName: string
  fileUrl: string
  fileType: string
  filePath: string
}

export class UploadFileUseCase {
  constructor(private readonly fileStorage: FileStorage) {}

  async execute(request: UploadFileRequest): Promise<UploadFileResponse> {
    const { file, subFolder, organizationId } = request
    return this.fileStorage.uploadOne(file, subFolder, organizationId)
  }
}

export class UploadFilesUseCase {
  constructor(private readonly fileStorage: FileStorage) {}

  async execute(request: UploadFilesRequest): Promise<UploadFileResponse[]> {
    const { files, subFolder, organizationId } = request
    return this.fileStorage.uploadMany(files, subFolder, organizationId)
  }
}
