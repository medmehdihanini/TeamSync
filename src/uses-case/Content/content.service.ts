import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, Types } from "mongoose";
import { Content } from 'src/Schema/Content';
import { ContentRepository } from './Content-Repo/content.repository';

@Injectable()
export class ContentService {

  constructor(@InjectModel(Content.name) private ContentModel: Model<Content>,
              private Contentrrepo:ContentRepository,
              ) {}

  addContent(content:Content){
    return this.Contentrrepo.create(content);
  }

  UpdateContent(content:Content) {
      return this.Contentrrepo.update(content.id, content);
  }

  deleteContent(id:string) {
    return this.Contentrrepo.delete(id);
}

async deleteContentByDoc(id: string) {
    return this.Contentrrepo.deleteManyByDocId(id);
  }

  getAllByDoc(id:string){
    return this.Contentrrepo.find({Documentid: id});
  }
  

  getcontentById(id:string){
    return this.Contentrrepo.findById(id);
  }

}
