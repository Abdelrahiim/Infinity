import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaConnectionModule } from '@infinity/prisma-connection';
import { AuthModule } from './auth/auth.module';
import { CachingModule } from '@infinity/caching';

@Module({
  imports: [PrismaConnectionModule, AuthModule, CachingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
