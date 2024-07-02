import { Test } from '@nestjs/testing';
import { PrismaConnectionService } from './prisma-connection.service';

describe('PrismaConnectionService', () => {
  let service: PrismaConnectionService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [PrismaConnectionService],
    }).compile();

    service = module.get(PrismaConnectionService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
