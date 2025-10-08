import { IntersectionType, PickType } from '@nestjs/swagger';

import { Technology } from '../../technology/entities/technology.entity';
import { UserTechnology } from '../entities/user-technology.entity';

export class CreateUserTechnologyDto extends IntersectionType(
  PickType(UserTechnology, ['rating']),
  PickType(Technology, ['content']),
) {}
