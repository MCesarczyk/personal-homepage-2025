import { PickType } from '@nestjs/swagger';

import { ApiKey } from '../entities/api-key.entity';

export class CreateApiKeyDto extends PickType(ApiKey, [
  'description',
  'expiresAt',
]) {}
