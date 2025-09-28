import { IntersectionType, PickType } from '@nestjs/swagger';

import { UserTechnology } from '../entities/user-technology.entity';
import { Technology } from 'src/technology/entities/technology.entity';

export class AddUserTechnologyDto extends IntersectionType(
  PickType(UserTechnology, ['rating']),
  PickType(Technology, ['content']),
) {}
