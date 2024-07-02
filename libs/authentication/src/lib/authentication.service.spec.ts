import { Test } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { faker } from '@faker-js/faker';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthenticationService, JwtService, ConfigService],
    }).compile();

    service = module.get(AuthenticationService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
  it('should Return access and refresh tokens', async () => {
    const userId = faker.datatype.uuid();
    const email = faker.internet.email();
    const tokens = await service.obtainTokens(userId, email);
    expect(tokens.accessToken).toBeDefined();
    expect(tokens.refreshToken).toBeDefined();
  });
});
