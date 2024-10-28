import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import {
  ActivationDto,
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from './dto/user.dto';
import { PrismaService } from '../../../prisma/services/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email/email.service';
import { TokenSenderService } from './utils/sendToken';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly emailService: EmailService,
    private readonly sendToken: TokenSenderService,
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

  async login(loginDto: LoginDto, response: Response) {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new BadRequestException('Email is not exist');
    }
    if (!(await this.comparePassword(password, user.password))) {
      throw new BadRequestException('Incorrect password');
    }
    const { accessToken, refreshToken } = this.sendToken.sendToken(user);
    return { accessToken, refreshToken, user, response };
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  async getloggedUser(req: any) {
    const user = req.user;
    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;
    return { user, accessToken, refreshToken };
  }

  async logOut(req: any) {
    req.user = null;
    req.accessToken = null;
    req.refreshToken = null;
    return { message: 'Log out successfully' };
  }

  async getUsers() {
    return this.prismaService.user.findFirst({});
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const email = forgotPasswordDto.email;
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new BadRequestException('User not found with this email!');
    }
    const forgotPasswordToken = await this.generateForgotPasswordLink(user);
    const resetPasswordUrl =
      this.configService.get<string>('CLIENT_SIDE_URI') +
      `/reset-password?verify=${forgotPasswordToken}`;

    await this.emailService.sendEmail({
      email,
      subject: 'Reset your Password!',
      template: './forgot-password',
      name: user.name,
      activationCode: resetPasswordUrl,
    });

    return { message: `Your forgot password request succesful!` };
  }

  async generateForgotPasswordLink(user: User) {
    const forgotPasswordToken = this.jwtService.sign(
      {
        user,
      },
      {
        secret: this.configService.get<string>('FORGOT_PASSWORD_SECRET'),
        expiresIn: '5m',
      },
    );
    return forgotPasswordToken;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, activationToken } = resetPasswordDto;
    const decoded = await this.jwtService.decode(activationToken);
    if (!decoded) {
      throw new BadRequestException('Invalid activation token');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: decoded.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return { user: updatedUser };
  }
}
