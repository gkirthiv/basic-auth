/* eslint-disable prettier/prettier */
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './../auth/model/auth.model';
import { AuthRepository } from './../auth/repository/auth.repository';
import { UserHandler } from './command/user.handler';
import { UserRepository } from './repository/user.repository';
import { GetUserHandler } from './query/get-user.handler';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]), CqrsModule],
  providers: [UserService, AuthRepository, UserRepository, UserHandler, GetUserHandler],
  controllers: [UserController]
})
export class UserModule { }
