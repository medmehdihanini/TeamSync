import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { Folder } from "../../../Schema/Folder.Schema";
import { FolderRepositoryInterface } from "./folder.repository.interface";


@Injectable()
export class FolderRepository extends BaseAbstractRepository<Folder> implements FolderRepositoryInterface {
  constructor(@InjectModel(Folder.name) private readonly FolderModue: Model<Folder>) {
    super(FolderModue);
  }



















}
