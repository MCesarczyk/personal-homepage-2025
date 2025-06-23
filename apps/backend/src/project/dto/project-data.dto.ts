import { OmitType } from '@nestjs/swagger';

import { Project } from '../entities/project.entity';

export class ProjectDataDto extends OmitType(Project, ['userId']) {}
