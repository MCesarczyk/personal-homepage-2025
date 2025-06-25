import { PickType } from '@nestjs/swagger';
import { TokensData } from '../entities/tokens-data.entity';

export class TokenRefreshResponseDto extends PickType(TokensData, [
  'accessToken',
]) {}
