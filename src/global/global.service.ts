/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFileType } from 'utils/multer.config';
import { promises as fs } from 'fs';

@Injectable()
export class GlobalService {
  private containerName: string;
  private azureConnection : string

  constructor() {
    this.azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING as string;

}

    // Method to get blob client
    private getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
    const containerClient = blobClientService.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
    }


  // Method to upload file to Azure Blob Storage
  async upload(file: UploadedFileType): Promise<string> {
    try {
      const pdfUrl = uuidv4() + file.originalname;
      const blobClient = this.getBlobClient(pdfUrl);
      const buffer = await fs.readFile(file.path);
      await blobClient.uploadData(buffer); // Upload file data
      return pdfUrl; // Return URL of uploaded file
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }
}
