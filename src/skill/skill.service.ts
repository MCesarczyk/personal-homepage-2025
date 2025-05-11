import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { PrismaService } from '../prisma.service';
import { SkillDataDto } from 'src/skill/dto/skill-data.dto';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}

  create(
    createSkillDto: CreateSkillDto,
    userId: string,
  ): Promise<SkillDataDto> {
    return this.prisma.skill.create({
      data: { ...createSkillDto, userId },
      select: {
        id: true,
        content: true,
        state: true,
      },
    });
  }

  findAll(userId: string): Promise<SkillDataDto[]> {
    return this.prisma.skill.findMany({
      where: { userId },
      select: {
        id: true,
        content: true,
        state: true,
      },
    });
  }

  async findOne(id: string, userId: string): Promise<SkillDataDto | null> {
    const matchedSkill = await this.prisma.skill.findUnique({
      where: { id, userId },
      select: {
        id: true,
        content: true,
        state: true,
      },
    });

    if (!matchedSkill) {
      throw new NotFoundException('Skill not found');
    }

    return matchedSkill;
  }

  async update(
    id: string,
    updateSkillDto: UpdateSkillDto,
    userId: string,
  ): Promise<SkillDataDto> {
    const updatedSkill = await this.prisma.skill.findUnique({
      where: { id, userId },
    });

    if (!updatedSkill) {
      throw new NotFoundException('Skill not found');
    }

    return this.prisma.skill.update({
      where: { id, userId },
      data: updateSkillDto,
      select: {
        id: true,
        content: true,
        state: true,
      },
    });
  }

  async remove(id: string, userId: string): Promise<SkillDataDto> {
    const deletedSkill = await this.prisma.skill.findUnique({
      where: { id, userId },
    });

    if (!deletedSkill) {
      throw new NotFoundException('Skill not found');
    }

    return this.prisma.skill.delete({
      where: { id: deletedSkill?.id },
      select: {
        id: true,
        content: true,
        state: true,
      },
    });
  }
}
