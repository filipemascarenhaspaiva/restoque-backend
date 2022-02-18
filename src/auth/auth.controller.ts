import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, AuthResponse } from './dto/login.dto';
import { AuthUser } from './auth-user.decorator';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary:'Make Login'
  })
  login(@Body() data: LoginDto): Promise<AuthResponse> {
    return this.service.login(data);
  }

  @UseGuards(AuthGuard())
  @Get('profile')
  @ApiOperation({
    summary:'Get a User'
  })
  @ApiBearerAuth()
  profile(@AuthUser() user: User) {
    return user
  }
}