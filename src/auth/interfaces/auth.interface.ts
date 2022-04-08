/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export interface Auth extends mongoose.Document {
    id: string;
    email: string;
    password: string;
    date: Date;
}