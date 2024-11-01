// import { Module } from '@nestjs/common';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../guards/auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserResolver } from '../resolvers/users.resolvers';
import { EmailModule } from '../email/email.module';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenSenderService } from '../utils/services/sendToken.service';
import { UsersController } from './app.controller';
import { UsersService } from './app.service';

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

