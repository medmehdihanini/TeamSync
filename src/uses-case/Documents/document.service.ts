import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './Document-Repo/document.repository';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import { Model } from "mongoose";
import { Folder } from "../../Schema/Folder.Schema";
import { SharedService } from "../../shared/shared-service/shared.service";
import { Documents } from "../../Schema/Documents.Schema";
import { CreateDocDto } from "./DTO/CreateDoc.dto";

@Injectable()
export class DocumentService {

  constructor(private documentRepository: DocumentRepository,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Documents.name) private Documentmodel: Model<Documents>,
              private sharedService: SharedService
              ) {}



  async createDocument(document: CreateDocDto) {

  }

  addDocument(document:Documents){
    return this.documentRepository.create(document);
  }

  getOne(id:string){
    return this.documentRepository.findById(id);
  }

  delete(id:string){
    return this.documentRepository.delete(id);
  }

  update(document:Documents){
    return this.documentRepository.update(document._id,document);
  }

  getAll(){

  }

}
