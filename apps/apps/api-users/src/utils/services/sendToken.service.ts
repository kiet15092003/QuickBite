import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entities/user.entity';

@Injectable()
export class TokenSenderService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  public sendToken(user: User) {
    const accessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        expiresIn: '5m',
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
        expiresIn: '3d',
      },
    );
    return { accessToken, refreshToken };
  }
}
