/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './../auth/repository/auth.repository';

@Injectable()
export class UserService {
    constructor(private authRepository: AuthRepository) { }

    async getUser(email: string) {
        const user = await this.authRepository.find({ email })
        return user
    }
}
