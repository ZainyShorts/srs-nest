/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { v4 as uuidv4 } from 'uuid';
import { UploadedFileType } from 'utils/multer.config';
import { promises as fs } from 'fs';

@Injectable()
export class GlobalService {
  private containerName: string;
  private azureConnection: string;

  constructor() {
    this.azureConnection = process.env
      .AZURE_STORAGE_CONNECTION_STRING as string;
    this.containerName = process.env.AZURE_CONTAINER_NAME || 'student-files'; // Set container name
  }

  // Method to get blob client
  private getBlobClient(imageName: string): BlockBlobClient {
    const blobClientService = BlobServiceClient.fromConnectionString(
      this.azureConnection,
    );
    const containerClient = blobClientService.getContainerClient(
      this.containerName,
    );
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  // Method to upload file to Azure Blob Storage
  async upload(file: UploadedFileType, folder?: string): Promise<string> {
    try {
      // Create unique filename with folder structure
      const fileExtension = file.originalname.split('.').pop();
      const uniqueFileName = `${uuidv4()}.${fileExtension}`;
      const blobName = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

      const blobClient = this.getBlobClient(blobName);
      const buffer = await fs.readFile(file.path);

      // Set content type based on file type
      const contentType = this.getContentType(file.originalname);

      await blobClient.uploadData(buffer, {
        blobHTTPHeaders: {
          blobContentType: contentType,
        },
      });

      // Clean up temporary file
      await fs.unlink(file.path);

      // Return the full URL of uploaded file
      return blobClient.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

  // Method to upload multiple files
  async uploadMultiple(
    files: UploadedFileType[],
    folder?: string,
  ): Promise<string[]> {
    const uploadPromises = files.map((file) => this.upload(file, folder));
    return Promise.all(uploadPromises);
  }

  // Method to delete file from Azure Blob Storage
  async deleteFile(blobName: string): Promise<boolean> {
    try {
      const blobClient = this.getBlobClient(blobName);
      const deleteResponse = await blobClient.delete();
      return deleteResponse._response.status === 202;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  // Helper method to determine content type
  private getContentType(filename: string): string {
    const extension = filename.toLowerCase().split('.').pop();
    const contentTypes: { [key: string]: string } = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
    return contentTypes[extension || ''] || 'application/octet-stream';
  }

  // Method to get file URL (if you need to construct it manually)
  getFileUrl(blobName: string): string {
    const blobClient = this.getBlobClient(blobName);
    return blobClient.url;
  }
} 


// /* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
// import { v4 as uuidv4 } from 'uuid';
// import { UploadedFileType } from 'utils/multer.config';
// import { promises as fs } from 'fs';

// @Injectable()
// export class GlobalService {
//   private containerName: string;
//   private azureConnection : string

//   constructor() {
//     this.azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING as string;

// }

//     // Method to get blob client
//     private getBlobClient(imageName: string): BlockBlobClient {
//     const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
//     const containerClient = blobClientService.getContainerClient(this.containerName);
//     const blobClient = containerClient.getBlockBlobClient(imageName);
//     return blobClient;
//     }

//   // Method to upload file to Azure Blob Storage
//   async upload(file: UploadedFileType): Promise<string> {
//     try {
//       const pdfUrl = uuidv4() + file.originalname;
//       const blobClient = this.getBlobClient(pdfUrl);
//       const buffer = await fs.readFile(file.path);
//       await blobClient.uploadData(buffer); // Upload file data
//       return pdfUrl; // Return URL of uploaded file
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       throw new Error('Failed to upload file');
//     }
//   }
// }
