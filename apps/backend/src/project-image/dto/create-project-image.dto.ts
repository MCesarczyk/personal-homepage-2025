import { OmitType } from '@nestjs/swagger';

import { ProjectImage } from '../entities/project-image.entity';

export class CreateProjectImageDto extends OmitType(ProjectImage, ['id']) {}
