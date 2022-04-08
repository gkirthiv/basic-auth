/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { User } from '../interface/user.interface';

@Injectable()
export class UserRepository extends BaseRepository<User> {
    constructor(@InjectModel('Auth') userModel: Model<User>) {
        super(userModel)
    }
}
