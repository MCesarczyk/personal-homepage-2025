import { ApiProperty, OmitType } from '@nestjs/swagger';

import { UserTechnology } from '../entities/user-technology.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserTechnologyDataDto extends OmitType(UserTechnology, [
  'userId',
]) {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The content of the technology',
    example: 'JavaScript',
  })
  content: string;
}
