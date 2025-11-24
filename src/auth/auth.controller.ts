import {
  Controller,
  Post,
  Body,
  ConflictException,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      const user = await this.authService.register(dto.email, dto.password);
      // padronizando o envelope conforme o que o front espera
      return {
        message: 'Usuário criado',
        user: {
          _id: user._id,
          email: user.email,
        },
      };
    } catch (error: any) {
      if (error.code === 11000) {
        // exceção conhecida do nest
        throw new ConflictException('Alguém já está utilizando esse e-mail!');
      }
      // erro 400 para manter a api mais simples
      throw new BadRequestException('Falha no registro.');
    }
  }

  @Post('login') // POST /auth/login
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    return {
      message: 'Login realizado',
      user: {
        _id: user._id,
        email: user.email,
      },
    };
  }
}
