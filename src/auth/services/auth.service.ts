import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(email: string, pass: string){
        const user = await this.userService.findOne(email);

        // cek user exists
        if(!user){
            throw new UnauthorizedException(`email and password doesn't match`)
        }

        // cek password (nb: must change to implementing hash)
        if(user.password !== pass){
            throw new UnauthorizedException(`email and password doesn't match`)
        }

        // payload to jwt
        const payload = {
            sub: user.id,
            email: user.email
        }

        return {
            access_token : await this.jwtService.signAsync(payload)
        }
    }

}
