import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsBoolean
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  codigo: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  descricao: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  categoria: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  precoOriginal: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  porcentagemdesc: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  precoComDesconto: number;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  disponivelEmEstoque: boolean;
}
