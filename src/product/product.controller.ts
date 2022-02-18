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
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '@prisma/client';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Cadastrar um produto'
  })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.service.create(createProductDto);
  }

  @Get('/findAll')
  @ApiOperation({
    summary: 'Pegar todos os produtos cadastrados'
  })
  findAll(): Promise<Product[]> {
    return this.service.findAll();
  }

  @Get('/find/:codigo')
  @ApiOperation({
    summary: 'Pegar por codigo os produtos'
  })
  FindByCode(@Param('codigo') codigo: number): Promise<Product> {
    return this.service.findByCode(codigo);
  }

  @Get('/findPerName/:name')
  @ApiOperation({
    summary: 'Pegar por nome os produtos'
  })
  findPerName(@Query('name')name:string): Promise<Product>{
    return this.service.findPerName(name)
  }
  
  
  @Patch('/product/:id')
  @ApiOperation({
    summary: 'Atualizar os produtos'
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateProductDto,
  ): Promise<Product> {
    return this.service.update(+id, data);
  }

  @Delete('/product/:id')
  @ApiOperation({
    summary: 'Deletar Produtos'
  })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
