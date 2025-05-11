import { PickType } from '@nestjs/swagger';
import { TokensData } from '../entities/tokens-data.entity';

export class TokenRefreshPayloadDto extends PickType(TokensData, [
  'refreshToken',
]) {}
