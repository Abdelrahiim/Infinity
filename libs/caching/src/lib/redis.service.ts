import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService
  extends Redis
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private configService: ConfigService) {
    super({
      host: configService.get('KEYDB_HOST'),
      port: parseInt(configService.get('KEYDB_PORT') || '6379'),
      password: configService.get('KEYDB_PASSWORD'),
    });
  }
  async onModuleDestroy() {
    await this.quit();
    Logger.log('Redis Connection closed');
  }
  onModuleInit() {
    Logger.log('Redis Connection established');
  }
}
