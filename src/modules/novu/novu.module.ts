import { Module } from '@nestjs/common';
import { NovuService } from './novu.service';
import { NovuProvider } from './providers/novu.provider';

@Module({
  providers: [NovuService, NovuProvider],
  exports: [NovuProvider, NovuService],
})
export class CloudinaryModule {}
