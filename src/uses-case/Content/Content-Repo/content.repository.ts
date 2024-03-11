import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { Content } from 'src/Schema/Content';
import { ContentRepositoryInterface } from './content.repository.interface';


@Injectable()
export class ContentRepository extends BaseAbstractRepository<Content> implements ContentRepositoryInterface {
  constructor(@InjectModel(Content.name) private readonly contentModel: Model<Content>) {
    super(contentModel);

    
  }


  async deleteManyByDocId(id: string): Promise<any> {
    return this.contentModel.deleteMany({ Documentid: id }).exec();
  }
















}
