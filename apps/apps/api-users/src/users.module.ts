import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserResolver } from './resolvers/users.resolvers';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { AuthGuard } from './guards/auth.guard';
import { PrismaService } from './utils/services/prisma.service';
import { TokenSenderService } from './utils/services/sendToken.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    EmailModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ConfigService,
    JwtService,
    PrismaService,
    EmailService,
    UserResolver,
    TokenSenderService,
    AuthGuard,
  ],
})
export class UsersModule {}
