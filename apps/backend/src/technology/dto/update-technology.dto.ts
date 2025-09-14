import { PartialType } from '@nestjs/swagger';

import { Technology } from '../entities/technology.entity';

export class UpdateTechnologyDto extends PartialType(Technology) {}
