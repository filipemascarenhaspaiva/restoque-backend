import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { LoginDto, AuthResponse } from './dto/login.dto';
  import { PrismaService } from 'src/prisma/prisma.service';
  import * as bcrypt from 'bcrypt';
  import { JwtService } from '@nestjs/jwt';
  import { throwIfEmpty } from 'rxjs';
  
  @Injectable()
  export class AuthService {
    constructor(private db: PrismaService, private jwt: JwtService) {}
  
    async login(data: LoginDto): Promise<AuthResponse> {
      const { email, password } = data;
      const user = await this.db.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new NotFoundException('Usuario não encontrado');
      }
  
      const hashValid = await bcrypt.compare(password, user.password);
  
      if (!hashValid) {
        throw new UnauthorizedException('Credenciais invalidas');
      }
  
      delete user.password;
  
      return {
        token: this.jwt.sign({ email }),
        user,
      };
    }
  }