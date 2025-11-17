import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common'; // decoretor injetable e exceções http já prontas
import * as bcrypt from 'bcrypt'; // biblioteca de hash
import { UserService } from '../user/user.service'; // serviço que acessa o banco

@Injectable() // marcando classe como provider injetavel pelo nest
export class AuthService {
    constructor(private readonly userService: UserService) { } // injeta o UserService, os models não são injetados, por isso delegamos para o UserService

    /*
        1- verifica se o e-mail existe
        2- fazer o hash da senha
        3- criar o usuario via UserService
        4- remover o passwordHash do retorno
    */

    async register(email: string, password: string) {
        // verificar duplicidade de email
        const existing = await this.userService.findByEmail(email);
        if (existing) {
            // conflito de recurso
            throw new ConflictException('Alguém já está utilizando esse e-mail!');
        } // se existir bota o http 409 - evitando duplicicade

        // hash de senha
        const saltOrRounds = 10; // valor padrão aceitavel para desenvolvimento
        const passwordHash = (await bcrypt.hash(password, saltOrRounds));

        // criar usuario atraves de UserService
        const created = await this.userService.createUser(email, passwordHash); // chama o UserService para persistir o usuario

        // remover o passwordHash do retorno
        const plain = (created as any).toObject ? (created as any).toObject : created; // normaliza o doc mongoose para o objeto plain (se for necessário)
        const { password: _, ...safe } = plain; // remove o hash do retorno (sem expor ao cliente)
        return safe;
    }

    /*
          validar credenciais
          1- buscar usuario por email
          2- Compara senha com bcrypt.compare.
          3- se for válido retornar ao usuario sem o passwordHash
          4- se for inválido lançar um UnauthorizedException
      */

    // validar usuario (buscar, comparar, verificar)
    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email); // buscando email
        if (!user) {
            throw new UnauthorizedException('Credenciais inválidas');
        } // se não encontrar o e-mail retorna 401

        const isMatch = await bcrypt.compare(password, user.passwordHash); // comparando senha com o hash do  banco
        if (!isMatch) {
            throw new UnauthorizedException('Credenciais inválidas');
        } // se a senha não estiver correta retorna 401

        const plain = (user as any).toObject ? (user as any).toObject : user;
        const { passwordHash: _, ...safe } = plain;
        return safe; // sempre normalizando antes de devolver ao usuario
    }

    // implementação posterior: jwt
    // stub para colocar geração de jwt
    async login(user: any) {
        return { message: 'JWT não implementado ainda', user }; // por enquanto roda apenas essa mensagem
    }
}