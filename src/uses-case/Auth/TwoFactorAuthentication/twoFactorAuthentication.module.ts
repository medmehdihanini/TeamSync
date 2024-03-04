import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/uses-case/User/user.module';
import { UserService } from 'src/uses-case/User/user.service';
import { UserRepository } from 'src/uses-case/User/UserRepo/user.repository';
import { TwoFactorAuthenticationService } from './twoFactorAuthentication.service';
import { TwoFactorAuthenticationController } from 'src/Controllers/twoFactorAuthentication.controller';
import { AuthService } from '../auth.service';



@Module({
  imports: [
    ConfigModule,
    UserModule,
  ],
  providers: [
    TwoFactorAuthenticationService,
    AuthService
  ],
  controllers: [TwoFactorAuthenticationController],
})
export class TwoFactorAuthenticationModule {}
