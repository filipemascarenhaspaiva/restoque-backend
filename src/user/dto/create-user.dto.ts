/* eslint-disable prettier/prettier */
import { IsEmail, IsInt, IsString,IsNotEmpty, MinLength, IsBoolean, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @IsString()
  @ApiProperty()
  socialName: string;
  
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  passwordConfirmation: string;;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  admim: boolean;

  @IsInt()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  @ApiProperty()
  cpf: number;

}

