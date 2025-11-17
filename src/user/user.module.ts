import { Module } from '@nestjs/common'; // decortator module, usamos para declarar os modulos nestjs
import { MongooseModule } from '@nestjs/mongoose'; // modulo que integra o mongo com o nestjs
import { User, UserSchema } from './user.schema'; // importando a classe user que representa o schema user e importando UserSchema que de fato é o SchemaFactory
import { UserService } from './user.service';

@Module({ // registrando modelo
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]) // 'registre o modelo chamado User com este schema'
        // user.name vira um model chamado User dentro do mongo
        // UserSchema schema real
    ],
    providers: [UserService], // registrando o UserService no modulo
    exports: [UserService], // tornando o UserService disponivel em outro modulo

    // não é necessário configurar nada sobre o provider
})


export class UserModule { }; // fechando o decorator e exporta o modulo
