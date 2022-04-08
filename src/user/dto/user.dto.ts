/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ example: 'test@email.com' })
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'user name' })
    fullName: string;
}