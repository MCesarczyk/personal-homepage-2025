import { OmitType } from '@nestjs/swagger';

import { UserTechnology } from '../entities/user-technology.entity';

export class AddUserTechnologyDto extends OmitType(UserTechnology, [
  'userId',
]) {}
