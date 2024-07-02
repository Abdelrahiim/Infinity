import { Test } from '@nestjs/testing';
import { CachingService } from './caching.service';
import { RedisService } from './redis.service';

describe('CachingService', () => {
  let service: CachingService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [CachingService, RedisService],
    }).compile();

    service = module.get(CachingService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
