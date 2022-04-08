import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './../auth/model/auth.model';
import { AuthRepository } from './../auth/repository/auth.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }])],
  providers: [UserService, AuthRepository],
  controllers: [UserController]
})
export class UserModule { }
