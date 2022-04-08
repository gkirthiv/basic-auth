/* eslint-disable prettier/prettier */
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../repository/user.repository';
import { GetUserQuery } from './get-user.query';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
    constructor(private repo: UserRepository) { }

    async execute(query: GetUserQuery) {
        return this.repo.find(query)
    }
}
