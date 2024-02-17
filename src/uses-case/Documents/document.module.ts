import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import mongoose from "mongoose";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../../Schema/User.Schema";
import { Documents, DocumentsSchema } from "../../Schema/Documents.Schema";
import { DocumentRepository } from './Document-Repo/document.repository';
import {DocumentRepositoryInterface} from "./Document-Repo/document.repository.interface";
import { DocumentsController } from "../../Controllers/Documents.Controller";

@Module({
  imports:[    MongooseModule.forFeature([{ name: Documents.name, schema: DocumentsSchema }]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentService,
   DocumentRepository, {

    provide: 'DocumentRepositoryInterface',
    useClass: DocumentRepository
  }]
})
export class DocumentModule {}
