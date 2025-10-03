import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddUserTechnologyDto } from './dto/add-user-technology.dto';
import { UserTechnologyDataDto } from './dto/user-technology-data.dto';
import { TechnologyService } from '../technology/technology.service';
import { UpdateUserTechnologyDto } from 'src/user/dto/update-user-technology.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly technologyService: TechnologyService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const password = await bcrypt.hash(createUserDto.password, 10);

    return this.prisma.user.create({
      data: { ...createUserDto, password },
    });
  }

  async getUserById(userId: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: updateUserDto,
    });
  }

  async updateUserPassword(userId: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async addUserTechnology(
    userId: string,
    dto: AddUserTechnologyDto,
  ): Promise<UserTechnologyDataDto> {
    let technology;
    technology = await this.technologyService.findByContent(dto.content);
    if (!technology) {
      const response = await this.technologyService.create({
        content: dto.content,
      });
      technology = response;
    }

    const userTechnology = await this.prisma.userTechnology.upsert({
      where: {
        userId_technologyId: {
          userId,
          technologyId: technology.id,
        },
      },
      update: {
        rating: dto.rating,
      },
      create: {
        userId,
        technologyId: technology.id,
        rating: dto.rating,
      },
    });

    return {
      technologyId: technology.id,
      content: technology.content,
      rating: userTechnology.rating || undefined,
      createdAt: userTechnology.createdAt,
      updatedAt: userTechnology.updatedAt,
    };
  }

  async getUserTechnologies(userId: string): Promise<UserTechnologyDataDto[]> {
    const userTechnologies = await this.prisma.userTechnology.findMany({
      where: { userId },
    });

    const technologies = await this.technologyService.findAll();
    const technologyIds = technologies.map((tech) => tech.id);

    return userTechnologies.map((technology) => ({
      technologyId: technology.technologyId,
      content: technologyIds.includes(technology.technologyId)
        ? technologies.find((tech) => tech.id === technology.technologyId)
            ?.content || '' // eslint-disable-line
        : 'Unknown Technology',
      rating: technology.rating || undefined,
      createdAt: technology.createdAt,
      updatedAt: technology.updatedAt,
    }));
  }

  async getUserTechnology(
    userId: string,
    technologyId: string,
  ): Promise<UserTechnologyDataDto | undefined> {
    const technology = await this.technologyService.findById(technologyId);
    if (!technology) {
      throw new NotFoundException('Technology does not exist');
    }

    const userTechnology = await this.prisma.userTechnology.findUnique({
      where: {
        userId_technologyId: {
          userId,
          technologyId,
        },
      },
    });

    if (!userTechnology) {
      throw new NotFoundException('Technology is not assigned to user');
    }

    return {
      technologyId: technology.id,
      content: technology.content,
      rating: userTechnology.rating || undefined,
      createdAt: userTechnology.createdAt,
      updatedAt: userTechnology.updatedAt,
    };
  }

  async updateUserTechnology(
    userId: string,
    technologyId: string,
    userTechnologyUpdateDto: UpdateUserTechnologyDto,
  ): Promise<UserTechnologyDataDto | undefined> {
    const technology = await this.technologyService.findById(technologyId);
    if (!technology) {
      throw new NotFoundException('Technology does not exist');
    }

    const userTechnology = await this.prisma.userTechnology.findUnique({
      where: {
        userId_technologyId: {
          userId,
          technologyId,
        },
      },
    });

    if (!userTechnology) {
      throw new NotFoundException('Technology is not assigned to user');
    }

    if (
      userTechnologyUpdateDto.rating === undefined ||
      userTechnologyUpdateDto.rating === userTechnology.rating
    ) {
      return;
    }

    const updatedUserTechnology = await this.prisma.userTechnology.update({
      where: {
        userId_technologyId: {
          userId,
          technologyId,
        },
      },
      data: userTechnologyUpdateDto,
    });

    return {
      technologyId: technology.id,
      content: technology.content,
      rating: updatedUserTechnology.rating || undefined,
      createdAt: updatedUserTechnology.createdAt,
      updatedAt: updatedUserTechnology.updatedAt,
    };
  }

  async removeUserTechnology(
    userId: string,
    technologyId: string,
  ): Promise<UserTechnologyDataDto | undefined> {
    const technology = await this.technologyService.findById(technologyId);
    if (!technology) {
      throw new NotFoundException('Technology does not exist');
    }

    const record = await this.prisma.userTechnology.findUnique({
      where: { userId_technologyId: { userId, technologyId } },
    });
    if (!record)
      throw new NotFoundException('Technology is not assigned to user');

    const deletedUserTechnology = await this.prisma.userTechnology.delete({
      where: {
        userId_technologyId: {
          userId,
          technologyId,
        },
      },
    });

    return {
      technologyId: technology.id,
      content: technology.content,
      rating: deletedUserTechnology.rating || undefined,
      createdAt: deletedUserTechnology.createdAt,
      updatedAt: deletedUserTechnology.updatedAt,
    };
  }
}
