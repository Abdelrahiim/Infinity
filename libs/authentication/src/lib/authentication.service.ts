import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Payload, Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwt: JwtService,
    private readonly configService: ConfigService
  ) {}
  /**
   * Async function to obtain access and refresh tokens for a user.
   *
   * @param {string} userId - The user ID for whom tokens are being obtained.
   * @param {string} email - The email of the user.
   * @returns {Promise<Tokens>} An object containing the access and refresh tokens.
   */
  public async obtainTokens(userId: string, email: string): Promise<Tokens> {
    const payload: Payload = {
      sub: userId,
      email,
    };
    const accessTokenSecretKey = this.configService.get('JWT_SECRET');
    const refreshTokenSecretKey = this.configService.get(
      'REFRESH_TOKEN_SECRET_KEY'
    );

    const accessToken = await this.jwt.signAsync(payload, {
      secret: accessTokenSecretKey,
      expiresIn: '10m',
    });
    const refreshToken = await this.jwt.signAsync(payload, {
      secret: refreshTokenSecretKey,
      expiresIn: '7d',
    });
    return {
      accessToken,
      refreshToken,
    };
  }
  /**
   * Async function to hash a password.
   *
   * @param {string} password - The password to hash.
   * @return {Promise<string>} A Promise that resolves to the hashed password.
   */
  public async hashPassword(password: string): Promise<string> {
    const hash = await argon2.hash(password);
    return hash;
  }
  /**
   * Verifies a password against a hash.
   *
   * @param {string} password - The password to verify.
   * @param {string} hash - The hash to compare against.
   * @return {Promise<boolean>} A Promise that resolves to a boolean indicating whether the password is valid.
   */
  public async verifyPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    const isValid = await argon2.verify(hash, password);
    return isValid;
  }
}
