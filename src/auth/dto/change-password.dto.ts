import { PickType } from '@nestjs/swagger';
import { SignInDto } from 'src/auth/dto/sign-in.dto';

export class ChangePasswordDto extends PickType(SignInDto, ['password']) {}
