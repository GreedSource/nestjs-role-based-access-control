import { DeliveryType, ResourceType } from 'cloudinary';

export interface CloudinaryDestroyOptionsInterface {
  resource_type?: ResourceType;
  type?: DeliveryType;
  invalidate?: boolean;
}
