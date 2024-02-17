import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { Folder } from "../../../Schema/Folder.Schema";
import { SharedAssets } from "../../../Schema/SharedAssets.Schema";
import { SharedAssetsRepositoryInterface } from "./SharedAssets.repository.interface";


@Injectable()
export class SharedAssetsRepository extends BaseAbstractRepository<SharedAssets> implements SharedAssetsRepositoryInterface {
  constructor(@InjectModel(SharedAssets.name) private readonly SharedAssetsModule: Model<SharedAssets>) {
    super(SharedAssetsModule);
  }



















}
