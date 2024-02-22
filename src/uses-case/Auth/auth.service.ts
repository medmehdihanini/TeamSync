import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../User';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string): Promise<{access_token: string}> {
        const user = await this.userService.findUserByEmail(email);
        console.log(user);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return{access_token: await this.jwtService.signAsync(payload),};
      }
}
