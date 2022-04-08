import { HttpException, HttpStatus } from '@nestjs/common';
/* eslint-disable prettier/prettier */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../repository/user.repository';
import { UserCommand } from './user.command';

@CommandHandler(UserCommand)
export class UserHandler implements ICommandHandler<UserCommand>{
    constructor(private repo: UserRepository) { }

    async execute(command: UserCommand): Promise<any> {
        const { email, fullName } = command;
        const findUser = await this.repo.findOne({ email });
        if (!findUser) {
            throw new HttpException('user not found', HttpStatus.NOT_FOUND)
        }
        const user = await this.repo.findOneAndUpdate({ email }, { fullName })
        return user
    }
}