import { OmitType } from '@nestjs/swagger/dist/type-helpers/omit-type.helper';

import { UserTechnology } from '../entities/user-technology.entity';

export class UpdateUserTechnologyDto extends OmitType(UserTechnology, [
  'technologyId',
  'userId',
  'createdAt',
  'updatedAt',
]) {}
