import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    description: 'Id of the user',
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'john.doe@mail.com',
    description: 'Email of the user',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: 'Password of the user',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Software Engineer',
    description: 'The occupation of the user',
  })
  occupation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'I am a software engineer who loves to code',
    description: 'The introduction of the user',
  })
  introduction: string;
}
