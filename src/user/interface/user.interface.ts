/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
    id: string;
    fullName: string;
    email: string;
    password: string;
    date: Date;
}