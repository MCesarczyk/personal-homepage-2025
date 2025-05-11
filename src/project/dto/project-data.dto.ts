import { OmitType } from '@nestjs/swagger';

import { Project } from '../../project/entities/project.entity';

export class ProjectDataDto extends OmitType(Project, ['userId']) {}
