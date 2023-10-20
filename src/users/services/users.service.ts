import { Injectable } from '@nestjs/common';
import { User } from "../models/user.model";

@Injectable()
export class UsersService {

    private readonly users : User[] = [
        {
            id: 1,
            email: 'email1@example.com',
            password: 'password'
        },
        {
            id: 2,
            email: 'email2@example.com',
            password: 'password'
        }
    ]

    async findOne(email: string): Promise<User | undefined>{
        return this.users.find(user => user.email === email)
    }

}
