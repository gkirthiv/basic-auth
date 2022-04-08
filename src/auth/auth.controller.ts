/* eslint-disable prettier/prettier */
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'User Login' })
    @ApiResponse({ status: 200, description: 'OK' })
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }

    @Post('register')
    @ApiOperation({ summary: 'Register User' })
    @ApiResponse({ status: 201, description: 'Created' })
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }

}