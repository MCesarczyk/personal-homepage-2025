import { IntersectionType, OmitType } from '@nestjs/swagger';
import { TokensData } from 'src/auth/entities/tokens-data.entity';

import { User } from 'src/user/entities/user.entity';

export class RegisterResponseDto extends IntersectionType(
  OmitType(User, ['id', 'password']),
  TokensData,
) {}
