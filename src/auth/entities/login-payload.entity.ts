import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginPayload {
  @ApiProperty({
    example: 'john.doe@mail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
