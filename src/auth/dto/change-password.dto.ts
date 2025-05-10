import { PickType } from '@nestjs/swagger';

import { SignInDto } from '../../auth/dto/sign-in.dto';

export class ChangePasswordDto extends PickType(SignInDto, ['password']) {}
