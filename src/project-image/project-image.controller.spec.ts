import { Test, TestingModule } from '@nestjs/testing';
import { ProjectImageController } from './project-image.controller';
import { ProjectImageService } from './project-image.service';
import { PrismaService } from '../prisma.service';

describe('ProjectImageController', () => {
  let controller: ProjectImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectImageController],
      providers: [ProjectImageService, PrismaService],
    }).compile();

    controller = module.get<ProjectImageController>(ProjectImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
