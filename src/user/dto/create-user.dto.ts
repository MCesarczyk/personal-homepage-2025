import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { User } from '../../user/entities/user.entity';

export class CreateUserDto
  // eslint-disable-next-line
  implements
    Pick<User, 'name' | 'email' | 'password' | 'occupation' | 'introduction'>
{
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@mail.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Software Engineer',
    description: 'The occupation of the user',
  })
  readonly occupation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'I am a software engineer who loves to code',
    description: 'The introduction of the user',
  })
  readonly introduction: string;
}
