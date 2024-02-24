import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, Req, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/uses-case/Auth/auth.service';
import { LoginDto } from 'src/uses-case/User/DTO/Login.dto';
import { Public } from 'src/Custom Decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
;

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }


}
