import { IsString, IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    descricao: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    categoria: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    porcentagemdesc: number

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    precoComDesconto: number

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty()
    disponivelEmEstoque: boolean
}