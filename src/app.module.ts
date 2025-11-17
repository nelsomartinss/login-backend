// app module é o modulo raiz

import { Module } from '@nestjs/common'; // decorador, classe = modulo
import { AppController } from './app.controller'; // rotas iniciais
import { AppService } from './app.service'; // logica do controller
import { MongooseModule } from '@nestjs/mongoose'; // conexão com o banco mongodb

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/auth')], // criando uma conexão principal com o banco usando a url passada
  controllers: [AppController], // responsavel por receber as requisições http
  providers: [AppService], // logica de negocio, acesso ao banco, validações, regras do sistema
})
export class AppModule { } // ponto de entrada do app (referencia no main.ts)
