import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma-db-restaurant/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(){
    console.log("use db conn: " + process.env.RESTAURANT_DATABASE_URL)
    super({
      datasources: {
        db: {
          url: process.env.RESTAURANT_DATABASE_URL, 
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}