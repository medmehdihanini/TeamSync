import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../../repositories/Base/base.abstract.repository';
import { User,  } from 'src/Schema/User.Schema';
import { UserRepositoryInterface } from "./user.repository.interface";


@Injectable()
export class UserRepository extends BaseAbstractRepository<User> implements UserRepositoryInterface {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }



















}
