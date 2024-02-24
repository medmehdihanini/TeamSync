import mongoose from "mongoose";
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { User } from "../Schema/User.Schema";
import { UserService } from "../uses-case/User";
import { CreatUserDto } from "../uses-case/User/DTO/CreatUser.dto";
import { Public } from "src/Custom Decorators/public.decorator";

@Controller('users')
export class UsersController {

  constructor(private usersService: UserService) { }
  @Public()
  @Post('signup')
  async createUser(@Body() createUserDto: CreatUserDto) {
    try {
      const newUser = await this.usersService.CreatUser(createUserDto);
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Delete('deleteuser/:id')
  async DeleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('invalide ID', 400);
    const deleteuser = await this.usersService.deleteUser(id);
    if (!deleteuser) throw new HttpException('user not found', 404);
    return deleteuser;
  }

  @Public()
  @Get('all')
  GetAllUser() {
    return this.usersService.findAllUser();
  }



  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('user not found', 404);
    const findUser = await this.usersService.findOneUser(id);
    if (!findUser) {
      throw new HttpException('user not foundt', 404);
    }
    return findUser;
  } 
  
  @Public()
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  @Patch('/update/:id')
  async UpdateUser(
    @Body() creatUserDto: CreatUserDto,
    @Param('id') id: string,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid ID', 400);
    const updateUser = await this.usersService.UpdateUser(id, creatUserDto);
    if (!updateUser) throw new HttpException('user not found', 404);
    return updateUser;
  }

}
