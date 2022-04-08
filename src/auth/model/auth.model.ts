/* eslint-disable prettier/prettier */
import { Prop, Schema } from '@nestjs/mongoose';
import { IsString, IsEmail } from 'class-validator';
import * as mongoose from 'mongoose';

@Schema()
export class Test {
    @Prop({ required: true, unique: true })
    @IsString()
    @IsEmail()
    email: string;
}

export const AuthSchema = new mongoose.Schema({
    id: { type: String },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: false },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
})