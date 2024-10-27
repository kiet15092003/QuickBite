import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../../prisma/services/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const gplContext = GqlExecutionContext.create(context);
    const { req } = gplContext.getContext();
    const accessToken = req.headers.accesstoken as string;
    const refreshToken = req.headers.refreshtoken as string;
    if (!accessToken || !refreshToken) {
      throw new UnauthorizedException('Please login to access this resource!');
    }
    if (accessToken !== null) {
      await this.updateAccessToken(req);
    }
    return true;
  }

  public async updateAccessToken(req: any): Promise<void> {
    const refreshToken = req.headers.refreshtoken as string;
    const decodedRefreshToken = await this.jwtService.decode(refreshToken);
    const expirationTime = decodedRefreshToken.exp;
    if (expirationTime * 1000 < Date.now()) {
      throw new UnauthorizedException('Please login to access this resource!');
    }
    const user = await this.prismaService.user.findFirst({
      where: {
        id: decodedRefreshToken.id,
      },
    });
    const newAccessToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    const newRefreshToken = this.jwtService.sign(
      {
        id: user.id,
      },
      {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      },
    );
    req.user = user;
    req.headers.accesstoken = newAccessToken;
    req.headers.refreshtoken = newRefreshToken;
  }
}
