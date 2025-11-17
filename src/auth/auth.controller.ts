import { Controller, Post, Body, ConflictException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth') // prefixo auth/* - definir todos os endpoints que começam com auth
// auth/* tudo que começa com /auth/
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register') // define o endpoint POST/auth/register
    async register(@Body() body: { email: string, password: string }) {     
        // capturando erros
        try {
            return await this.authService.register(body.email, body.password)
        } catch (error) {
            // trata erro E11000 (chave duplicada) - duas requisções podem chegar ao mesmo tempo, ambas fazem o findByEmail e nenhuma encontra o usuario, ambas fazem o createUser() e o mongodb vai tentar criar dois docs com o mesmo email e vai dar erro E11000
            if (error.code === 11000) {
                throw new ConflictException('Alguém já está utilizando esse e-mail!')
            } // retorna o http 409 - conflito

            throw new BadRequestException('Falha no registro.'); // qualquer outro erro retorna o 400.
        }
    }

    @Post('login') // POST /auth/login
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.validateUser(body.email, body.password);
    }
}