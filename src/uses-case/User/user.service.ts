import { Injectable } from "@nestjs/common";
import { User } from "../../Schema/User.Schema";
import { UserRepository } from "./UserRepo/user.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatUserDto } from "./DTO/CreatUser.dto";
import { Settings } from "../../Schema/Settings.Schema";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./DTO/Login.dto";


@Injectable()
export class UserService {

  constructor(private readonly userRe: UserRepository, @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Settings.name) private SettingsModel: Model<Settings>


  ) {
  }

  async CreatUser({ settings, ...creatUserDto }: CreatUserDto) {
    let randomNumber: number;
    let usernameWithNumber: string;
    let userExists: boolean;
    const existingUser = await this.userRe.findOne({ email: creatUserDto.email });
    if (existingUser) {
      throw new Error("There is already an account with this email.");
    }
    do {
      randomNumber = Math.floor(Math.random() * 10000); 
      const paddedNumber = randomNumber.toString().padStart(4, '0'); 
      usernameWithNumber = `${creatUserDto.username}#${paddedNumber}`;
      userExists = await this.userRe.findUserWithNumber(usernameWithNumber);
    } while (userExists);
  
    const saltOrRounds = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const password = creatUserDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(creatUserDto.password, hash);
    const newuser = new this.userModel({
      ...creatUserDto,
      password: hash,
      username: usernameWithNumber,
    });
  
    console.log("Hash: ", hash);
    console.log("Are The Password and the hash are matched? : ", isMatch);
    console.log("The New User: ", newuser);
  
    return await newuser.save();
  }
  
  async loginUser(loginDto: LoginDto) {
    const user = await this.userRe.findOne({ email: loginDto.email });
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Mot de passe incorrect");
    }
    return user;
  }


  deleteUser(id: string) {
    return this.userRe.delete(id);

  }

  findAllUser() {
    return this.userRe.findAll();
  }

  findOneUser(id: string) {
    return this.userRe.findById(id);
  }

  findUserByEmail(email: string) {
    return this.userRe.findByEmail(email);
  }

  UpdateUser(id: string, creatuserdto: CreatUserDto) {
    return this.userRe.update(id, creatuserdto);
  }


}




