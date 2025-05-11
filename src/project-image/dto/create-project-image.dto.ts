import { OmitType } from '@nestjs/swagger';

import { ProjectImage } from '../../project-image/entities/project-image.entity';

export class CreateProjectImageDto extends OmitType(ProjectImage, ['id']) {}
