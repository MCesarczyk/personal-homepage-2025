import { PickType } from '@nestjs/swagger';
import { SignInDto } from 'src/auth/dto/signIn.dto';

export class ChangePasswordDto extends PickType(SignInDto, ['password']) {}
