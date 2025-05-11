import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProjectImage {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the project image',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The url of the project image',
  })
  url: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the project',
  })
  projectId: string;
}
