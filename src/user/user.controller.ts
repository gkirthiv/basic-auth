/* eslint-disable prettier/prettier */
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { GetUser } from './../auth/decorator/get-user.decorator';
import { Auth } from './../auth/interfaces/auth.interface';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    @Get('me')
    findMe(@GetUser() user: Auth) {
        return user;
    }

}

