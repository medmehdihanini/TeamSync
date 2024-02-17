import { Injectable } from '@nestjs/common';
import { DocumentRepository } from './Document-Repo/document.repository';

@Injectable()
export class DocumentService {

  constructor(private documentRepository: DocumentRepository) {}

}
