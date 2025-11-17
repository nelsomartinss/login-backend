// definindo/criando estrutura/schema

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; // importando decorators do mongoose que vai nos permitir criar o schema com a sintaxe baseada em typescript

// tipo typescript que representa um documento mongoose, ajuda a tipar corretamente o model
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>; // alias de tipo

@Schema({ timestamps: true }) // registrando classe user
export class User {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    passwordHash: string; // hash de senha

    @Prop({ default: 'local' })
    provider: string;

    // o timestamps: true armazena o momento da criação e ja criar o creatAt e o updateAt e cuida das adualizações
    // Prop define uma propriedade, todas as propriedades que possuem required é porque é obrigatorio, os que tiverem "unique" é para evitar que tenha dois usuarios iguais
    // o hash de senha é obrigatorio pois nunca devemos armazenar ela em texto, com isso fica explicito que a senha gerada será criptografada
    // o default 'local' é para diferenciar se foi feito login com login e senha ou com google, por exemplo
}

export const UserSchema = SchemaFactory.createForClass(User);