import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'john.doe@mail.com',
    required: true,
  })
  @IsString()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  @IsString()
  readonly password: string;
}
