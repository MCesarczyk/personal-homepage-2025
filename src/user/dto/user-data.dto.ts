import { OmitType } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class UserDataDto extends OmitType(User, ['id', 'password']) {
  name: string;
  email: string;
  occupation: string;
  introduction: string;
}
