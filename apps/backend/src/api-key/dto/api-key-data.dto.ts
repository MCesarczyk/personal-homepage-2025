import { PickType } from '@nestjs/swagger';

import { ApiKey } from '../entities/api-key.entity';

export class ApiKeyDataDto extends PickType(ApiKey, [
  'id',
  'description',
  'isActive',
  'createdAt',
  'lastUsedAt',
  'expiresAt',
]) {}
