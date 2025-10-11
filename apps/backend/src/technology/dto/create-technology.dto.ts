import { OmitType } from '@nestjs/swagger';

import { Technology } from '../entities/technology.entity';

export class CreateTechnologyDto extends OmitType(Technology, ['id']) {}
