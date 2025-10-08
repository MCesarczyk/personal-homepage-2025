import { IntersectionType, OmitType } from '@nestjs/swagger';

import { Technology } from '../../technology/entities/technology.entity';
import { UserTechnology } from '../entities/user-technology.entity';

export class UserTechnologyDataDto extends IntersectionType(
  OmitType(UserTechnology, ['userId']),
  OmitType(Technology, ['id']),
) {}
