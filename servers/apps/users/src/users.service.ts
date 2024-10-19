import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // getHello(): string {
  //   return 'Hello World!';
  // }

  async Register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = 'user';
    return user;
  }

  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = {
      email,
      password,
    };
    return user;
  }
}
