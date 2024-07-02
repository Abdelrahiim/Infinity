import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayLoadWithToken, Payload } from '../types/PayLoad';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class JwtRtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: FastifyRequest,
    payload: Payload
  ): Promise<PayLoadWithToken> {
    const headers = req.headers['authorization'] as string;
    const refreshToken = headers.replace('Bearer ', '').trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
