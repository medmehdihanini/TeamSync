import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './Document-Repo/document.repository';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import { Model, Types } from "mongoose";
import { Documents } from "../../Schema/Documents.Schema";
import { Folder } from 'src/Schema/Folder.Schema';
import { UserRepository } from '../User';
import { FolderRepository } from '../Folder/Folder-repo/folder.repository';

@Injectable()
export class DocumentService {

  constructor(private documentRepository: DocumentRepository,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Folder.name) private folderModel: Model<Folder>,
              private userrepo:UserRepository,
              private folderrepo:FolderRepository
              ) {}


   async addDocument(document:Documents){
  if(Types.ObjectId.isValid(document.parentfolder.toString())){
    document.parentfolder=document.parentfolder.toString();
  }else{
    let folder=new this.folderModel();
    folder.foldername=document.parentfolder
    folder.createdby=document.createdby
    const newfolder=await folder.save()
    document.parentfolder=newfolder._id
  }
    document.createdby= document.createdby.toString()
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
