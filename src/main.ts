import { NestFactory } from '@nestjs/core'; // ponto de entrada para iniciar o app
import { AppModule } from './app.module'; // modulo raiz da aplicação
import { ValidationPipe } from '@nestjs/common'; // ValidationPipe é usado para validar e transformar os dtos recebidos

async function bootstrap() { // definindo função boostrap que é assíncrona e inicia tudo 
  const app = await NestFactory.create(AppModule); // aplicação nest e aguarda iniciação, app é a instalancia do servidor

  // Registrar pipes globais antes de ouvir a porta
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remover campos extras
    forbidNonWhitelisted: false, // opcional
    transform: true,  // transformando payload nos DTOs automaticamente
  })),

    await app.listen(process.env.PORT ?? 3000); // inicia a servidor
}

bootstrap();
