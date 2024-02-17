import mongoose from "mongoose";
import { Body, Controller, Post } from "@nestjs/common";
import { User } from "../Schema/User.Schema";
import { UserService } from "../uses-case/User";

@Controller('users')
export class UsersController {

  constructor(private usersService: UserService) {}
  @Post()
  // @UsePipes(new ValidationPipe())  bch tatctiver validation eli fi creatUserDto kan fi api edhy
  creatuser(@Body() createUserDto: User) {
    console.log(createUserDto);
    return this.usersService.CreatUser(createUserDto);
  }


}
