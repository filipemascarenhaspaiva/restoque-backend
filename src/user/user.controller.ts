import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Cadastrar um usuario'
  })
  async create(@Body() data: CreateUserDto):Promise<User> {
    return this.service.create(data);
  }

  @Get('/finall')
  @ApiOperation({
    summary: 'Pegar todos os usuarios'
  })
  findAll():Promise<User[]> {
    return this.service.findAll();
  }

  @Get('/find/:id')
  @ApiOperation({
    summary: 'Pegar um usuario por id'
  })
  findOne(@Param('id') id: string) :Promise<User> {
    return this.service.findOne(+id);
  }
  
  @Get('/findemail/:email')
  @ApiOperation({
    summary: 'Pegar um usuario por email'
  })
  findPerEmail(@Query('email') email: string) :Promise<User> {
    return this.service.findPerEmail(email)
  }

  @Patch('/user/:id')
  @ApiOperation({
    summary: 'Atualizar o cadastro de um usuario'
  })
  update(@Param('id') id: string):Promise<User> {
    return this.service.update(+id, UpdateUserDto);
  }

  @Delete('/user/:id')
  @ApiOperation({
    summary: 'Deletar um usuario cadastrado'
  })
  remove(@Param('id') id: string):Promise<User> {
    return this.service.remove(+id);
  }
}
