import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-db-user/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(){
    console.log("use db conn: " + process.env.USER_DATABASE_URL)
    super({
      datasources: {
        db: {
          url: process.env.USER_DATABASE_URL, 
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
