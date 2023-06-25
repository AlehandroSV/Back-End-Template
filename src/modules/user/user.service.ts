import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../database/PrismaService';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(createUserDto: CreateUserDto) {
    const existUser = await this.findByEmail(createUserDto.email);

    if (existUser) {
      throw new HttpException(
        { message: 'O usuário com esse e-mail já existe.' },
        HttpStatus.CONFLICT,
      );
    }

    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 8),
    };

    const userCreated = await this.prisma.user.create({ data });

    return {
      ...userCreated,
      password: undefined,
    };
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({ where: { id } });

      return {
        ...user,
        password: undefined,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
