import { PickType } from '@nestjs/swagger';

import { CreateUserTechnologyDto } from './create-user-technology.dto';

export class UpdateUserTechnologyDto extends PickType(CreateUserTechnologyDto, [
  'rating',
]) {}
