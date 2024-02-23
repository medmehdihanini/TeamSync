import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './Document-Repo/document.repository';
import { Documents } from 'src/Schema/Documents.Schema';

@Injectable()
export class DocumentService {

  constructor(private documentRepository: DocumentRepository) {}

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
