import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {Request} from "express";
import {JwtService} from "@nestjs/jwt";
import 'dotenv/config'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean>{

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if(!token){
      throw new UnauthorizedException(`unvalid token`)
    }
    try {
      request['user'] = await this.jwtService.verifyAsync(
          token, {
            secret: process.env.SECRET_KEY
          }
      )
    } catch (err){
      throw new UnauthorizedException(err.message)
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }





}
