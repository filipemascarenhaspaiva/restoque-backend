import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';


const lista = [];

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  async create(dados: CreateUserDto): Promise <User> {
      const exists = await this.prisma.user.findFirst({
        where: {email: dados.email}
      })
      if(exists){
        throw new ConflictException('Email ja esta em uso!')
      }
      if(dados.password !== dados.passwordConfirmation){
        throw new ConflictException('Senhas não conferem!')
      }
      delete dados.passwordConfirmation;

      const hashedPassword = await bcrypt.hash(dados.password, 10);
      const user = await this.prisma.user.create({
        data: {
          ...dados,
          password: hashedPassword,
        },
      });
      delete user.password
      return user
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findPerEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({where: {email: email}})
  }

  async findOne(id: number): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(
    id: number,
    updateuserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.prisma.user.update({
      data: { ...updateuserDto },
      where: { id },
    });
  }


  async remove(id: number) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
