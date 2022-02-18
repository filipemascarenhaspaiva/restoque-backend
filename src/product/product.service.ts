import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private db: PrismaService) {}

  async create(data: CreateProductDto): Promise<Product> {
    const product = await this.db.product.create({
      data,
    });
    return product;
  }

  async findPerName(name:string): Promise<Product> {
    const product = await this.db.product.findFirst({
      where: {name: name}
    })
    return product
  }

 async findAll(): Promise<Product[]> {
    const products = await this.db.product.findMany();
    return products
  }

 async findByCode(codigo: number): Promise<Product> {
    const product = await this.db.product.findUnique({
      where: {codigo: codigo}
    })
    return product
  }

  async update(
    id: number,
    updateproductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.db.product.update({
      data: { ...updateproductDto },
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.db.product.delete({ where: { id } });
  }
}
