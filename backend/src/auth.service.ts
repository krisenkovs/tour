import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(request: { email: string; password: string }) {
    const user = await this.usersService.findOne(request.email);
    if (!user || user.password !== request.password) {
      throw new HttpException(
        'Неверное имя пользователя или пароль',
        HttpStatus.FORBIDDEN,
      );
    }
    return {
      token: this.jwtService.sign({
        id: user.id,
        email: user.email,
      }),
    };
  }

  async register(request: {
    email: string;
    password: string;
    passwordConfirm: string;
    firstName?: string;
    lastName?: string;
  }) {
    const user = await this.usersService.findOne(request.email);
    if (user) {
      throw new HttpException(
        'Пользователь уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (request.password !== request.passwordConfirm) {
      throw new HttpException('Пароли не совпадают', HttpStatus.BAD_REQUEST);
    }

    const { password, ...rest } = await this.usersService.create({
      email: request.email,
      password: request.password,
      firstName: request.firstName,
      lastName: request.lastName,
    } as User);

    return rest;
  }
}
