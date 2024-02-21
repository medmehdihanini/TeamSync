import { Injectable } from "@nestjs/common";
import { User } from "../../Schema/User.Schema";
import { UserRepository } from "./UserRepo/user.repository";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatUserDto } from "./DTO/CreatUser.dto";
import { Settings } from "../../Schema/Settings.Schema";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./DTO/Login.dto";


@Injectable()
export class UserService {
  constructor(private readonly userRe: UserRepository, @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Settings.name) private SettingsModel: Model<Settings>
  ) {
  }

  async CreatUser({ settings, ...creatUserDto }: CreatUserDto) {
    if (settings) {
      const newSetting = new this.SettingsModel(settings);
      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(creatUserDto.password, saltOrRounds);
      const savedSetting = await newSetting.save();
      const newUser = new this.userModel({
        ...creatUserDto,
        password: hashedPassword,
        settings: savedSetting._id
      });
      return newUser.save();
    }
    const newuser = new this.userModel(creatUserDto);
    return newuser.save();
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


  UpdateUser(id: string, creatuserdto: CreatUserDto) {
    return this.userRe.update(id, creatuserdto);
  }


}




