import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class Project {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the project',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'My project',
    description: 'The title of the project',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'This is my project',
    description: 'The description of the project',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://github.com/username/project',
    description: 'The url of the project code',
  })
  codeUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://username.github.io/project',
    description: 'The url of the project demo',
  })
  demoUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the user that created the project',
  })
  userId: string;
}
