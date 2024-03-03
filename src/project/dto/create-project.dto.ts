import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    example: 'My project',
    description: 'The title of the project',
  })
  title: string;

  @ApiProperty({
    example: 'This is my project',
    description: 'The description of the project',
  })
  description: string;

  @ApiProperty({
    example: 'http://github.com/username/project',
    description: 'The url of the project code',
  })
  codeUrl: string;

  @ApiProperty({
    example: 'http://username.github.io/project',
    description: 'The url of the project demo',
  })
  demoUrl: string;

  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the user that created the project',
  })
  userId: string;
}
