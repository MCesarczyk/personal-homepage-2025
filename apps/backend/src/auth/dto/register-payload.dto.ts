import { OmitType } from '@nestjs/swagger';

import { User } from 'src/user/entities/user.entity';

export class RegisterPayloadDto extends OmitType(User, ['id']) {}
