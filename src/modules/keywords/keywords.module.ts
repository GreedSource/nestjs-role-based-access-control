import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Keyword } from '@entities/keyword.entity';
import { UserModule } from '@modules/user/user.module';
import { KeywordRepository } from './keywords.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword]), UserModule],
  controllers: [KeywordsController],
  providers: [KeywordsService, KeywordRepository],
})
export class KeywordsModule {}
