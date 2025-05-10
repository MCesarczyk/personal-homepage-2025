import { OmitType } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';

export class UserData extends OmitType(User, ['id', 'password']) {
  name: string;
  email: string;
  occupation: string;
  introduction: string;
}
