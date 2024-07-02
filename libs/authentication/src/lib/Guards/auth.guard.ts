import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private readonly configService: ConfigService
  ) {}
  /**
   * Asynchronously checks if the user can activate the current execution context.
   *
   * @param {ExecutionContext} context - The execution context.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating if the user can activate the context.
   * @throws {UnauthorizedException} If the token is not present in the request headers.
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const tokenHeader = request.headers['Authorization'];
    const token = this.extractTokenFromHeader(tokenHeader);
    if (!token) {
      throw new UnauthorizedException();
    }
    await this.validateAccessToken(token);
    return true;
  }

  /**
   * Validates the access token by verifying it using the JWT service.
   *
   * @param {string} token - The access token to be validated.
   * @return {Promise<void>} The payload of the validated token.
   * @throws {UnauthorizedException} If the token is invalid or expired.
   */
  private async validateAccessToken(token: string): Promise<void> {
    try {
      await this.jwt.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  /**
   * Extracts the token from the given header.
   *
   * @param {string} header - The header containing the token.
   * @return {string | null} The extracted token if it is a Bearer token, otherwise null.
   */
  private extractTokenFromHeader(header: string): string | null {
    const [type, token] = header.split(' ') ?? [];
    return type === 'Bearer' ? token : null;
  }
}
