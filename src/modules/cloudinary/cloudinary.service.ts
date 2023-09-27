import { Injectable } from '@nestjs/common';
import {
  DeliveryType,
  ResourceType,
  UploadApiErrorResponse,
  UploadApiResponse,
  v2,
} from 'cloudinary';
import toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  async uploadFile(
    file: Express.Multer.File,
    folder?: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream({ folder }, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteFile(
    public_id: string,
    options?: {
      resource_type?: ResourceType;
      type?: DeliveryType;
      invalidate?: boolean;
    },
  ) {
    return await v2.uploader
      .destroy(public_id, options)
      .then((result) => console.log(result));
  }
}
