import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTechnologyDto } from './dto/create-technology.dto';
import { UpdateTechnologyDto } from './dto/update-technology.dto';
import { PrismaService } from '../prisma.service';
import { TechnologyDataDto } from 'src/technology/dto/technology-data.dto';

@Injectable()
export class TechnologyService {
  constructor(private prisma: PrismaService) {}

  create(createTechnologyDto: CreateTechnologyDto): Promise<TechnologyDataDto> {
    return this.prisma.technology.create({
      data: { ...createTechnologyDto },
      select: {
        id: true,
        content: true,
      },
    });
  }

  findAll(): Promise<TechnologyDataDto[]> {
    return this.prisma.technology.findMany({
      select: {
        id: true,
        content: true,
      },
    });
  }

  async findOne(id: string): Promise<TechnologyDataDto | null> {
    const matchedTechnology = await this.prisma.technology.findUnique({
      where: { id },
      select: {
        id: true,
        content: true,
      },
    });

    if (!matchedTechnology) {
      throw new NotFoundException('Technology not found');
    }

    return matchedTechnology;
  }

  async update(
    id: string,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<TechnologyDataDto> {
    const updatedTechnology = await this.prisma.technology.findUnique({
      where: { id },
    });

    if (!updatedTechnology) {
      throw new NotFoundException('Technology not found');
    }

    return this.prisma.technology.update({
      where: { id },
      data: updateTechnologyDto,
      select: {
        id: true,
        content: true,
      },
    });
  }

  async remove(id: string): Promise<TechnologyDataDto> {
    const deletedTechnology = await this.prisma.technology.findUnique({
      where: { id },
    });

    if (!deletedTechnology) {
      throw new NotFoundException('Technology not found');
    }

    return this.prisma.technology.delete({
      where: { id: deletedTechnology?.id },
      select: {
        id: true,
        content: true,
      },
    });
  }
}
