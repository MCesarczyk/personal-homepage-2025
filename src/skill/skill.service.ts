import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './entities/skill.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.prisma.skill.create({
      data: createSkillDto,
    });
  }

  findAll(userId: string): Promise<Skill[]> {
    return this.prisma.skill.findMany({
      where: { userId },
    });
  }

  findOne(id: string, userId: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({
      where: { id, userId },
    });
  }

  update(
    id: string,
    updateSkillDto: UpdateSkillDto,
    userId: string,
  ): Promise<Skill> {
    return this.prisma.skill.update({
      where: { id, userId },
      data: updateSkillDto,
    });
  }

  remove(id: string, userId: string): Promise<Skill> {
    return this.prisma.skill.delete({
      where: { id, userId },
    });
  }
}
