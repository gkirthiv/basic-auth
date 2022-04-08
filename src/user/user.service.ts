import { CommandBus, QueryBus } from '@nestjs/cqrs';
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './../auth/repository/auth.repository';
import { UserCommand } from './command/user.command';
import { UserDto } from './dto/user.dto';
import { GetUserQuery } from './query/get-user.query';

@Injectable()
export class UserService {
    constructor(private authRepository: AuthRepository, private queryBus: QueryBus, private commandBus: CommandBus) { }

    async getUser(email: string) {
        const user = await this.authRepository.find({ email })
        return user
    }

    async updateProfile(dto: UserDto) {
        return this.commandBus.execute(new UserCommand(dto.email, dto.fullName))
    }

    async getAllUsers() {
        return this.queryBus.execute(new GetUserQuery())
    }
}
