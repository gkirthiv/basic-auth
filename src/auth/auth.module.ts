/* eslint-disable prettier/prettier */
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSchema } from './model/auth.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AllExceptionsFilter } from '../shared/exception-filters/all-exception-filters';
import { AuthRepository } from './repository/auth.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Auth', schema: AuthSchema }]), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, JwtStrategy, AllExceptionsFilter]
})
export class AuthModule { }
