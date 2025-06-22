import {
  UploadFileUseCase,
  UploadFilesUseCase,
  UploadFileRequest,
  UploadFilesRequest,
} from '../core/usecases/upload-file'
import { StorageFactory } from '../infrastructure/storage-factory'
import { FileStorage } from '../core/ports/file-storage'

export class UploadService {
  private static instance: UploadService
  private uploadFileUseCase: UploadFileUseCase
  private uploadFilesUseCase: UploadFilesUseCase

  private constructor(fileStorage?: FileStorage) {
    const storage = fileStorage || StorageFactory.create()
    this.uploadFileUseCase = new UploadFileUseCase(storage)
    this.uploadFilesUseCase = new UploadFilesUseCase(storage)
  }

  public static getInstance(fileStorage?: FileStorage): UploadService {
    if (!UploadService.instance) {
      UploadService.instance = new UploadService(fileStorage)
    }
    return UploadService.instance
  }

  async uploadOne(file: File, subFolder: string, organizationId: number) {
    const request: UploadFileRequest = { file, subFolder, organizationId }
    return this.uploadFileUseCase.execute(request)
  }

  async uploadMany(files: File[], subFolder: string, organizationId: number) {
    const request: UploadFilesRequest = { files, subFolder, organizationId }
    return this.uploadFilesUseCase.execute(request)
  }
}
