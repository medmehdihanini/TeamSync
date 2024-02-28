import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './Document-Repo/document.repository';
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../Schema/User.Schema";
import { Model, Types } from "mongoose";
import { Documents } from "../../Schema/Documents.Schema";
import { Folder } from 'src/Schema/Folder.Schema';
import { UserRepository } from '../User';
import { FolderRepository } from '../Folder/Folder-repo/folder.repository';
import { SimpleDocDto } from './DTO/SimpleDoc.dto';

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
    return this.documentRepository.findAll()
  }

  async getAllby(parentId: string, createdBy: string, createdDate: Date, lastUpdate: Date, page: number = 1, limit: number = 10) {
    const query: any = {};
  if (parentId && Types.ObjectId.isValid(parentId)) {
    console.log("parentId",parentId)
    query.parentfolder = new  Types.ObjectId(parentId);
  }
  if (createdBy && Types.ObjectId.isValid(createdBy)) {
    console.log("createdBy",createdBy)
    query.createdby = new  Types.ObjectId(createdBy);
  }
  if (createdDate) {
    console.log("createdDate",createdDate)
    query.createat = { $gte: createdDate };
  }
  if (lastUpdate) {
    console.log("lastUpdate",lastUpdate)
    query.Updateat = { $lte: lastUpdate };
  }
  try {
    const result = await this.documentRepository.findAllWithPagination(query, page, limit);
    const totalDocuments = result.totalDocuments;
    const totalPages = Math.ceil(totalDocuments / limit);
    const documents: SimpleDocDto[] = result.documents.map((document: any) => {
      const simpleDocDto: SimpleDocDto = new SimpleDocDto();
      simpleDocDto.id = document.id;
      simpleDocDto.title = document.title;
      simpleDocDto.createdby = document.createdby;
      simpleDocDto.createat = document.createat;
      simpleDocDto.Updateat = document.Updateat;
      return simpleDocDto;
    });

    return {
      documents,
      currentPage: page,
      totalPages,
      totalDocuments
    };
  } catch (error) {
    throw new Error(`Error retrieving documents: ${error}`);
  }
  }

  
}
