import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from '../../entities';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ])
  ],
  providers: [UserService, UserRepository],
  controllers: [UserController]
})
export class UserModule {}
