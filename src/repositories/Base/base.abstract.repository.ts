import { Model, Document, model, Error, Promise } from "mongoose";
import { BaseInterfaceRepository } from "./base.interface.repository";
import { filter } from "rxjs";

export abstract  class BaseAbstractRepository<T extends Document> implements  BaseInterfaceRepository<any>{
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async create(data: Partial<T>): Promise<T> {
    return await this.model.create(data);
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id).exec();
  }

  async findOne(filter: any): Promise<T | null> {
    return await this.model.findOne(filter).exec();
  }

  async find(filter: any): Promise<T[]> {
    return await this.model.find(filter).exec();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<T|null> {
    const result = await this.model.findByIdAndDelete(id);
    return await result;
  }

  findAll(): Promise<any[]> {
    return this.model.find();
  }


}
