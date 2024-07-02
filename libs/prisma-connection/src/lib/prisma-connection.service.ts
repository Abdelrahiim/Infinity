import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaConnectionService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  onModuleDestroy() {
    this.$disconnect;
    Logger.log('Database Connection closed');
  }
  onModuleInit() {
    this.$connect;
    Logger.log('Database Connection established');
  }
}
