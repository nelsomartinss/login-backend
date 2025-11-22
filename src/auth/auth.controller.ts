import {
  Controller,
  Post,
  Body,
  ConflictException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.authService.register(dto.email, dto.password);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Alguém já está utilizando esse e-mail!');
      }

      throw new BadRequestException('Falha no registro.');
    }
  }

  @Post('login') // POST /auth/login
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return user;
  }
}
