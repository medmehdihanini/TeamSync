import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../User';
import { JwtService } from '@nestjs/jwt';
/* import { Settings } from "../../Schema/Settings.Schema"; */
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<{access_token: string}> {
        const user = await this.userService.findUserByEmail(email);
        console.log(user);
        const isMatch = await bcrypt.compare(pass,user?.password);
        if (!isMatch) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return{access_token: await this.jwtService.signAsync(payload),};
      }

}
