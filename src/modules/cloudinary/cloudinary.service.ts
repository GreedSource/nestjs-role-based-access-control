import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { CloudinaryDestroyOptionsInterface } from 'src/interfaces/cloudinary-destroy-options.interface';

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
    options?: CloudinaryDestroyOptionsInterface,
  ) {
    return await v2.uploader
      .destroy(public_id, options)
      .then((result) => result);
  }
}
