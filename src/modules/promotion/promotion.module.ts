import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionEntity } from '../../entities';
import { PromotionRepository } from './promotion.repository';
import { RedisModule } from '../../utils/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromotionEntity
    ]), 
    RedisModule
  ],
  providers: [PromotionService, PromotionRepository],
  controllers: [PromotionController]
})
export class PromotionModule {}
