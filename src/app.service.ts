import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'selamat datang di bangunkota.com, belum ada apa apa disini';
  }
}
