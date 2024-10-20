import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async register(registerDto: RegisterDto, respone: Response) {
    const { name, email, password, phoneNumber } = registerDto;
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email }, { phoneNumber: phoneNumber }],
      },
    });
    if (existingUser) {
      throw new BadRequestException('Email or Phone number already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // const user = await this.prismaService.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     phoneNumber,
    //   },
    // });

    const user = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    };

    const activationToken = await this.createdActivationToken(user);

    const activationCode = activationToken.activationCode;

    console.log(activationCode);

    return { user, respone };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = {
      email,
      password,
    };
    return user;
  }

  async createdActivationToken(user: UserData) {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = this.jwtService.sign(
      {
        user,
        activationCode,
      },
      {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
        expiresIn: '5m',
      },
    );
    return { token, activationCode };
  }

  async getUsers() {
    return this.prismaService.user.findFirst({});
  }
}
