import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { ActivationDto, LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
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

    const user = {
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    };

    const activationToken = await this.createdActivationToken(user);
    const activationCode = activationToken.activationCode;
    await this.emailService.sendEmail({
      email,
      subject: 'Activate your account',
      template: './activation-mail',
      name,
      activationCode,
    });

    return { activationToken, respone };
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

  async activateUser(activationDto: ActivationDto, response: Response) {
    const { activationToken, activationCode } = activationDto;
    const newUser: { user: UserData; activationCode: string } =
      this.jwtService.verify(activationToken, {
        secret: this.configService.get<string>('ACTIVATION_SECRET'),
      } as JwtVerifyOptions);
    if (newUser.activationCode !== activationCode) {
      throw new BadRequestException('Invalid activation code');
    }
    const { name, email, password, phoneNumber } = newUser.user;
    const existingUser = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      throw new BadRequestException('User already exist with this email');
    }
    const user = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
      },
    });
    return { user, response };
  }

  async getUsers() {
    return this.prismaService.user.findFirst({});
  }
}
