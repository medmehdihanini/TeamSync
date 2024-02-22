import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards} from '@nestjs/common';
import { AuthService } from 'src/uses-case/Auth/auth.service';
import { LoginDto } from 'src/uses-case/User/DTO/Login.dto';
import { AuthGuard } from 'src/uses-case/Auth/auth.guard';
import { Public } from 'src/Custom Decorators/public.decorator';;
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: LoginDto) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}
