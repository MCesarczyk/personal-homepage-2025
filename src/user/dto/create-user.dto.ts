import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  readonly name: string;

  @ApiProperty({
    example: 'john.doe@mail.com',
    description: 'The email of the user',
  })
  readonly email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  readonly password: string;

  @ApiProperty({
    example: 'Software Engineer',
    description: 'The occupation of the user',
  })
  readonly occupation: string;

  @ApiProperty({
    example: 'I am a software engineer who loves to code',
    description: 'The introduction of the user',
  })
  readonly introduction: string;
}
