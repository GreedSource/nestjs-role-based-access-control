import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';

export interface FileErrorInterface {
  allowedExtensions: string[];
  ctx: ExecutionContext;
}

export const FileError = createParamDecorator(
  ({ allowedExtensions, ctx }: FileErrorInterface) => {
    const request = ctx.switchToHttp().getRequest();
    if (request?.fileError)
      throw new BadRequestException(
        `Accepted file extensions are ${allowedExtensions.join(', ')}`,
      );
  },
);
