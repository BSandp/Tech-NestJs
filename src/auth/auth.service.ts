import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) { }

    async validateUser(email: string, password: string): Promise<User> {
        try {
            const user = await this.userService.findByEmail(email);
            if (user && bcrypt.compareSync(password, user.password)) {
                return user;
            } else {
                throw new HttpException('Forbiden', HttpStatus.FORBIDDEN)
            }
        } catch (e) {
            throw new HttpException('Forbiden', HttpStatus.FORBIDDEN)
        }
    }
}