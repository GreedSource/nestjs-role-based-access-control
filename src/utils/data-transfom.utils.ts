import { ClassConstructor, plainToClass } from 'class-transformer';

export const JsonTransfom = ({ value }, cls: ClassConstructor<unknown>) => {
  if (typeof value === 'string') {
    try {
      value = JSON.parse(value).map((obj) => plainToClass(cls, obj));
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return value; // Return the original value if parsing fails
    }
  }
  return value;
};
