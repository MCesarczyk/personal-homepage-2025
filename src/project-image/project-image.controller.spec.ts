import { Test, TestingModule } from '@nestjs/testing';
import { ProjectImageController } from './project-image.controller';
import { ProjectImageService } from './project-image.service';

describe('ProjectImageController', () => {
  let controller: ProjectImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectImageController],
      providers: [ProjectImageService],
    }).compile();

    controller = module.get<ProjectImageController>(ProjectImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
