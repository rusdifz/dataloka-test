import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { database } from './config/db';
import { redisConfig } from './config/redis';
import { PromotionModule } from './modules/promotion/promotion.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    PromotionModule, 
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        database,
        redisConfig
      ]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get("config_db"),
      inject: [ConfigService]
    }),
  ]
})
export class AppModule {}
