import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaConnectionModule } from '@infinity/prisma-connection';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaConnectionModule,
    JwtModule.register({}),
  ],
  providers: [AuthenticationService, JwtService, ConfigService],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
