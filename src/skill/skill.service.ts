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

  findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  findOne(id: string): Promise<Skill | null> {
    return this.prisma.skill.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
    return this.prisma.skill.update({
      where: { id },
      data: updateSkillDto,
    });
  }

  remove(id: string): Promise<Skill> {
    return this.prisma.skill.delete({
      where: { id },
    });
  }
}
