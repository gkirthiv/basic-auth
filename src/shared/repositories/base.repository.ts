/* eslint-disable prettier/prettier */
import { Document, FilterQuery, Model } from 'mongoose';

export class BaseRepository<T extends Document>{
    constructor(protected readonly entityModel: Model<T>) { }

    find(filterQuery: FilterQuery<T>): Promise<T[] | null> {
        return this.entityModel.find(filterQuery).exec()
    }

    findOne(filterQuery: FilterQuery<T>, projection?: Record<string, any>): Promise<T | null> {
        return this.entityModel.findOne(filterQuery, { ...projection }).exec()
    }

    findById(filterQuery: any, projection?: Record<string, any>): Promise<T> {
        return this.entityModel.findById(filterQuery, { ...projection }).exec()
    }

    create(data: any): Promise<T> {
        return new this.entityModel(data).save();
    }
}