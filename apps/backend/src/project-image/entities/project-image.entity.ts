import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

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
    example: 'image.png',
    description: 'The filename of the project image',
  })
  fileName: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    example: false,
    description: 'Indicates if the image is the cover image of the project',
  })
  isCover: boolean;

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
