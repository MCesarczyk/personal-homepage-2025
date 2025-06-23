import { PickType } from '@nestjs/swagger';

import { LoginPayloadDto } from './login-payload.dto';

export class ChangePasswordPayloadDto extends PickType(LoginPayloadDto, [
  'password',
]) {}
