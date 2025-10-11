import { Test, TestingModule } from '@nestjs/testing';
import { TechnologyService } from './technology.service';
import { PrismaService } from '../prisma.service';

describe('SkillService', () => {
  let service: TechnologyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologyService, PrismaService],
    }).compile();

    service = module.get<TechnologyService>(TechnologyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
