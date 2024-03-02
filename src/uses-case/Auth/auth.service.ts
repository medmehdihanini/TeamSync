import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../User';
import { JwtService } from '@nestjs/jwt';
/* import { Settings } from "../../Schema/Settings.Schema"; */
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './tokenPayload.interface';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

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


  async signIn(email: string, pass: string): Promise<{ access_token: string, user: any , userId: string}> {
    const user = await this.userService.findUserByEmail(email);
    if (user.isTwoFactorAuthenticationEnabled) {
      return;
    }
    const isMatch = await bcrypt.compare(pass, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username, email: user.email};
    console.log("od:",user.id , user.username, user.email)
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user, 
      userId: user.id
    };
  }

  public getCookieWithJwtAccessToken(userId: string, isSecondFactorAuthenticated = false) {
    const payload: TokenPayload = { userId, isSecondFactorAuthenticated };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}s`
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`;
  }

  public getCookieWithJwtRefreshToken(userId: string) {
    const payload: TokenPayload = {
      userId,
      isSecondFactorAuthenticated: false
    };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
    });
    const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return {
      cookie,
      token
    }
  }


}
