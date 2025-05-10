import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginPayload } from 'src/auth/entities/login-payload.entity';

export class SignInDto implements LoginPayload {
  @ApiProperty({
    example: 'john.doe@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
