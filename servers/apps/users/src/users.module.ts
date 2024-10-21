import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../prisma/services/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserResolver } from './resolvers/users.resolvers';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';
import { TokenSenderService } from './utils/sendToken';
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
  ],
})
export class UsersModule {}
