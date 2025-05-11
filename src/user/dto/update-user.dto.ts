import { OmitType, PartialType } from '@nestjs/swagger';

import { CreateUserDto } from '../../user/dto/create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password']),
) {
  readonly refreshToken: string | null;
}
