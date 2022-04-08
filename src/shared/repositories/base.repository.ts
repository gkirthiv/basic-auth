/* eslint-disable prettier/prettier */
import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';

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

    findOneAndUpdate(filterQuery: FilterQuery<T>, data: UpdateQuery<any>): Promise<T | null> {
        return this.entityModel.findOneAndUpdate(filterQuery, data, { new: true }).exec()
    }

    create(data: any): Promise<T> {
        return new this.entityModel(data).save();
    }
}