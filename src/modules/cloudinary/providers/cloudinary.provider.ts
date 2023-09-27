import { Provider } from '@nestjs/common';
import { v2 } from 'cloudinary';

export const CLOUDINARY_PROVIDER_TOKEN = 'Cloudinary';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY_PROVIDER_TOKEN,
  useFactory: () => {
    return v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  },
};
