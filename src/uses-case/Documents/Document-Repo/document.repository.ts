import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { DocumentRepositoryInterface } from "./document.repository.interface";
import { Documents } from "../../../Schema/Documents.Schema";


@Injectable()
export class DocumentRepository extends BaseAbstractRepository<Documents> implements DocumentRepositoryInterface {
  constructor(@InjectModel(Documents.name) private readonly documentsModel: Model<Documents>) {
    super(documentsModel);
  }


  async findAllWithPagination(query: any,sortBy:string, page: number, limit: number) {
    const skip = (page - 1) * limit;
    const data = await this.documentsModel.find(query).skip(skip).limit(limit).sort({ Updateat: sortBy === 'asc' ? 1 : -1 }).exec();
    const totaldata = await this.documentsModel.countDocuments(query);
    return { data, totaldata };
  }
















}
