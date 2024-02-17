import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { User } from "../../Schema/User.Schema";
import { UserRepository } from "./UserRepo/user.repository";
import { Repository } from 'typeorm';

import { UserRepositoryInterface } from "./UserRepo/user.repository.interface";
import { Model } from "mongoose";
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,@InjectModel(User.name) private userModel: Model<User>) {
  }

CreatUser(creatUserDto: User){
return this.userRepository.create(creatUserDto);
}

}




