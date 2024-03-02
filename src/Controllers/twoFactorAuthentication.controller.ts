import {
  ClassSerializerInterceptor,
  Controller,
  Header,
  Post,
  UseInterceptors,
  Res,
  UseGuards,
  Req,
  HttpCode,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { TwoFactorAuthenticationService } from 'src/uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentication.service';
import { Response } from 'express';
import RequestWithUser from 'src/uses-case/Auth/requestWithUser.interface';
import { Public } from 'src/Custom Decorators/public.decorator';
import { UserService } from 'src/uses-case/User/user.service';
import TwoFactorAuthenticationCodeDto from 'src/uses-case/Auth/TwoFactorAuthentication/twoFactorAuthentificationCode.dto';
import { AuthService } from 'src/uses-case/Auth/auth.service';

@Controller('2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class TwoFactorAuthenticationController {
  constructor(
    private readonly twoFactorAuthenticationService: TwoFactorAuthenticationService,
    private readonly usersService: UserService,
    private readonly authService: AuthService
  ) { }

  @Public()
  @Post('generate')
  async register(@Res() response: Response, @Req() request: RequestWithUser) {
    const { otpauthUrl } = await this.twoFactorAuthenticationService.generateTwoFactorAuthenticationSecret(request.user);
    return this.twoFactorAuthenticationService.pipeQrCodeStream(response, otpauthUrl);
  }

  @Post('turn-on')
  @HttpCode(200)
  async turnOnTwoFactorAuthentication(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }
    await this.usersService.turnOnTwoFactorAuthentication(request.user.id.toString());
  }

  @Post('authenticate')
  @HttpCode(200)
  async authenticate(
    @Req() request: RequestWithUser,
    @Body() { twoFactorAuthenticationCode }: TwoFactorAuthenticationCodeDto
  ) {
    const isCodeValid = this.twoFactorAuthenticationService.isTwoFactorAuthenticationCodeValid(
      twoFactorAuthenticationCode, request.user
    );
    if (!isCodeValid) {
      throw new UnauthorizedException('Wrong authentication code');
    }

    const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id, true);

    request.res.setHeader('Set-Cookie', [accessTokenCookie]);

    return request.user;
  }
}