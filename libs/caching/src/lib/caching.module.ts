import { Module } from '@nestjs/common';
import { CachingService } from './caching.service';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  controllers: [],
  providers: [CachingService, RedisService],
  imports: [ConfigModule],
  exports: [CachingService],
})
export class CachingModule {}
