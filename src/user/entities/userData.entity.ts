import { ApiProperty } from '@nestjs/swagger';

export class UserData {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@mail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
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
