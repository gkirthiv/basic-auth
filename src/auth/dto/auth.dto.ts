/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'test@email.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'password123' })
    password: string;
}