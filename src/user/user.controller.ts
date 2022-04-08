/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtGuard } from './../auth/guard/jwt.guard';
import { GetUser } from './../auth/decorator/get-user.decorator';
import { Auth } from './../auth/interfaces/auth.interface';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';


@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }
    @Get('me')
    findMe(@GetUser() user: Auth) {
        return user;
    }

    @Put('update-profile')
    @ApiOperation({ summary: 'Update User Profile' })
    @ApiResponse({ status: 201, description: 'Created' })
    updateProfile(@Body() dto: UserDto) {
        return this.userService.updateProfile(dto)
    }

    @Get()
    find() { 
        return this.userService.getAllUsers()
    }
}

