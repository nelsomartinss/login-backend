import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; // classe com a logica de autenticação
import { AuthController } from './auth.controller'; // controller responsavel pelos endpoints
import { UserModule } from "src/user/user.module"; // AuthModule precisa usar UserModule porque AuthService vai usar userSerive e o UserService vai esta registrado dentro de UserModule

@Module({ // decorador Module - criar modulos
    imports: [
        UserModule, // "AuthModule precisa de UserModule para funcionar"
        // AuthService vai receber UserService via injeção como depedência
    ],
    controllers: [AuthController], // endpoints - no nestjs todo endpoint é declarado dentro de um controller, o controller representa a camada http da aplicação
    providers: [AuthService], // aqui é a lógica de autenticação - onde registramos um service automaticamente vira um provider, eles são serviços reutilizações, os services sempre são as classes principais de logica, na maioria dos casos os providers são os services
    // services = regra e negocio
    // controllers = http / endpoints
    // modules = organização
    // schemas/entities = estruturas de dados / modelos
})

export class AuthModule { }; // exporta o modulo que vai ser usado no app.module.ts