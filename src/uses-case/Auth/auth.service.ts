import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../User';
import { JwtService } from '@nestjs/jwt';
/* import { Settings } from "../../Schema/Settings.Schema"; */
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) { }

  /*    async signIn(email: string, pass: string): Promise<{access_token: string}> {
         const user = await this.userService.findUserByEmail(email);
         console.log(user);
         const isMatch = await bcrypt.compare(pass,user?.password);
         if (!isMatch) {
           throw new UnauthorizedException();
         }
         const payload = { sub: user.id, username: user.username };
         return{access_token: await this.jwtService.signAsync(payload),};
       } */

  /*  async getUserFromToken(token: string) {
     try {
         const decoded = this.jwtService.verify(token);
         const { sub: userId, username } = decoded;
         // Fetch user data based on userId
         const user = await this.userService.findUserById(userId);
         return user;
     } catch (error) {
         throw new UnauthorizedException('Invalid token');
     }
 } */


    async signIn(email: string, pass: string): Promise < { access_token: string, user: any } > {
    const user = await this.userService.findUserByEmail(email);
    const isMatch = await bcrypt.compare(pass, user?.password);
    if(!isMatch) {
      throw new UnauthorizedException();
    }

        // Add user data to the token payload
        const payload = { sub: user.id, username: user.username, email: user.email /* Add other user data as needed */ };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user // Return user data along with the token
    };
  }



}
