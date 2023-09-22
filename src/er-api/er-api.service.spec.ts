import { Test, TestingModule } from '@nestjs/testing';
import { ErApiService } from './er-api.service';

describe('ErApiService', () => {
  let service: ErApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErApiService],
    }).compile();

    service = module.get<ErApiService>(ErApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
