import { Injectable } from '@nestjs/common'; // decorator injectable usado para indicar que essa classe pode ser injetada em outro lugares
import { InjectModel } from '@nestjs/mongoose'; // decorator responsavel por injetar models no mongoose dentro de services
import { Model } from 'mongoose'; // importa o tipo model
// Com ele você faz: findOne, create, save, update, etc
import { User, UserDocument } from './user.schema'; // user é a classe usada para criação do schema e o userDocument é o tipo mongooseque combina o schema com os metodos do mongo

@Injectable() // "essa classe é um provider injetavel"
export class UserService { 
    constructor( // recebendo dependencias injetadas
        @InjectModel(User.name) private userModel: Model<UserDocument>, // injetando Model baseado no Schema - podemos acessar o banco pelo userModel
        // cria a propriedade userModel que acessa a coleção de users dentro do mongoDB, o model é a interface com o mongodb
    ) { }

    // função assincrona para criar o usuario
    async createUser(email: string, passwordHash: string) {
        return this.userModel.create({ // criação de novo doc direto no banco
            email,
            passwordHash,
            provider: 'local',
        });
    }

    // buscando doc onde email seja igual ao valor que foi recebido
    async findByEmail(email: string) {
        return this.userModel.findOne({ email }).exec(); // exec retorna uma promise
    } // isso verifica se o e-mail ja existe no banco de dados
}