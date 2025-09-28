import { IntersectionType, OmitType } from '@nestjs/swagger';
import { TokensData } from '../entities/tokens-data.entity';

import { User } from '../../user/entities/user.entity';

export class RegisterResponseDto extends IntersectionType(
  OmitType(User, ['id', 'password']),
  TokensData,
) {}
