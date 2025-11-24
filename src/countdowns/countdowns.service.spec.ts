import { Test, TestingModule } from '@nestjs/testing';
import { CountdownsService } from './countdowns.service';

describe('CountdownsService', () => {
  let service: CountdownsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountdownsService],
    }).compile();

    service = module.get<CountdownsService>(CountdownsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
