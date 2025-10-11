import { OmitType } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';

export class RegisterPayloadDto extends OmitType(User, ['id']) {}
