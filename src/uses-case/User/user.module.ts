import { Module } from '@nestjs/common';
import { UserService } from "./user.service";
import { UsersController } from "../../Controllers/user.controller";
import { UserRepository } from "./UserRepo/user.repository";
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/Schema/User.Schema';
import { Settings, SettingsSchema } from "../../Schema/Settings.Schema";

@Module({

  imports:[    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{name:Settings.name,schema:SettingsSchema}]),
  ],
  controllers: [UsersController],

  providers: [
    UserService,UserRepository,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository
    }
  ],
  exports: [UserService]

})
export class UserModule {}