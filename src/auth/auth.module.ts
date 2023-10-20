import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstant} from "./constants";
import 'dotenv/config'

@Module({
  imports: [
      UsersModule,
      JwtModule.register({
        global: true,
        secret: jwtConstant.secret,
        signOptions: {expiresIn: process.env.JWT_EXPIRES}
      })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
