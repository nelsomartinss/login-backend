import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    // login não precisa de regras avançadas, apenas validações básicas
}