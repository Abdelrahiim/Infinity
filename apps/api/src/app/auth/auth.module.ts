import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthenticationModule } from '@infinity/authentication';
import { PrismaConnectionModule } from '@infinity/prisma-connection';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [AuthenticationModule, PrismaConnectionModule],
})
export class AuthModule {}
