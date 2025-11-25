// validar os dados recebidos no POST/countdowns
// garente que apenas o title e  startAt (opcional) cheguem no controller
// codigo seguro

import { IsNotEmpty, IsOptional, IsString, MinLength, IsDateString } from 'class-validator';

export class CreateCountdownDto {
 
  // title obrigatorio, tamanho minimo de 1 caractere
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  title: string;
  
  // startAt é opcional
  @IsOptional()
  @IsDateString() // isso é usado para aceitar datas ISO caso o front queira enviar no futuro
  startAt: string;
}
