import { Test, TestingModule } from '@nestjs/testing';

import { ProjectImageService } from './project-image.service';
import { PrismaService } from '../prisma.service';

describe('ProjectImageService', () => {
  let service: ProjectImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectImageService, PrismaService],
    }).compile();

    service = module.get<ProjectImageService>(ProjectImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
