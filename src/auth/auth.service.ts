/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { AuthRepository } from './repository/auth.repository';

@Injectable()
export class AuthService {

    constructor(private repo: AuthRepository,
        private jwt: JwtService,
        private config: ConfigService) { }

    async login(dto: AuthDto) {
        try {
            const findUser = await this.repo.findOne({ email: dto.email });
            if (!findUser) {
                throw new NotFoundException()
            }

            const isPasswordMatches = await bcrypt.compare(dto.password, findUser.password);

            if (!isPasswordMatches)
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST)

            return this.signInToken(findUser._id, findUser.email);
        } catch (error) {
            return error
        }
    }

    async register(dto: AuthDto) {
        const findUser = await this.repo.findOne({ email: dto.email });
        if (findUser) {
            throw new HttpException('email already used', HttpStatus.BAD_REQUEST)
        }
        const hash = await this.sanitizedPassword(dto.password);
        const newUser = await this.repo.create({ email: dto.email, password: hash, fullName: dto.fullName });
        return this.signInToken(newUser._id, newUser.email);
    }

    async signInToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = { sub: userId, email }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret
        })
        return {
            access_token: token
        }
    }

    async sanitizedPassword(password: string) {
        const hash = await bcrypt.hash(password, 10)
        return hash
    }
}