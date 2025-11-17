import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    email: string; // valida formato de e-mail

    @IsString() // garante que a senha é string
    @MinLength(6) // senha de no mínimo 6 caracteres
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'A senha deve ter maiúscula, minúscula, número e caractere especial' },
    ) // regex que exige 1 letra maiuscula, 1 minuscula, 1 numero, 1 caractere especial e no total o minimo de 8 caracteres
    password: string;
}