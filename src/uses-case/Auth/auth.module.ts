import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../User/user.module';
import { AuthController } from 'src/Controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { PassportModule } from '@nestjs/passport';


@Module({
    imports: 
    [ 
        UserModule,
        PassportModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' },
          }),
    ],
    providers: 
    [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
          },
        AuthService,
     ],
    controllers: 
    [
        AuthController
    ]
})
export class AuthModule { }
