import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Payload } from '../types/PayLoad';
import { PrismaConnectionService } from '@infinity/prisma-connection';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly db: PrismaConnectionService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: Payload) {
    // TODO: We Should Cache it in Redis
    // key = "userId:${userId},model:${model},parameters:${JSON.parse(parameters)}" // encrupted Somehow not sure how yet
    const user = await this.db.user.findUnique({
      where: {
        id: payload.sub,
        email: payload.email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        firstname: true,
        lastname: true,
        twoWayAuth: true,
        emailVerified: true,
        provider: true,
        createdAt: true,
        updatedAt: true,
        imgId: true,
        role: {
          select: {
            roleName: true,
          },
          include: {
            RolePermision: true,
          },
        },
      },
    });
    return user;
  }
}
