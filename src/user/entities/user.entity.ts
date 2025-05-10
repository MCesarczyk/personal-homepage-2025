import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '53b542f6-e165-45df-8545-f8e8d47509b8',
    description: 'Id of the user',
  })
  id: number;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@mail.com',
    description: 'Email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'The occupation of the user',
  })
  occupation: string;

  @ApiProperty({
    example: 'I am a software engineer who loves to code',
    description: 'The introduction of the user',
  })
  introduction: string;
}
