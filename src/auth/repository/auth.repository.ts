/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../shared/repositories/base.repository';
import { Auth } from '../interfaces/auth.interface';

@Injectable()
export class AuthRepository extends BaseRepository<Auth> {
    constructor(@InjectModel('Auth') authModel: Model<Auth>) {
        super(authModel)
    }
}
