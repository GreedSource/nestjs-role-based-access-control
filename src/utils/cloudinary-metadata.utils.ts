import { File } from '@entities/file.entity';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';

export const CloudinaryMetadataUtil = (
  result: UploadApiResponse | UploadApiErrorResponse,
) => {
  return <File>{
    path: result?.secure_url,
    format: result?.format,
    filesize: result?.bytes,
    publicId: result?.public_id,
  };
};
