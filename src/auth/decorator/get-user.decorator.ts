/* eslint-disable prettier/prettier */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const userModel = {
        name: request.user.fullName,
        email: request.user.email,
        date: request.user.date
    }
    return userModel
})