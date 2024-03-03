import { ApiProperty } from '@nestjs/swagger';

export class ProjectImage {
  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the project image',
  })
  id: string;

  @ApiProperty({
    example: 'https://example.com/image.png',
    description: 'The url of the project image',
  })
  url: string;

  @ApiProperty({
    example: '9abf6400-1ce4-4fc8-a80a-05c0c2c697d7',
    description: 'The id of the project',
  })
  projectId: string;
}
