import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request} from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {SigninDto} from "../dto/signin.dto";
import {AuthGuard} from "../guard/auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SigninDto){
        return this.authService.signIn(signInDto.email, signInDto.password)
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Request() req){
        return req.user
    }

}
