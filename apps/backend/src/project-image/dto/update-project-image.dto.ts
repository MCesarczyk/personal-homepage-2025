import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateProjectImageDto } from './create-project-image.dto';

export class UpdateProjectImageDto extends PartialType(
  OmitType(CreateProjectImageDto, ['projectId']),
) {}
