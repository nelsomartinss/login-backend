import { IsOptional, IsString, MinLength, IsDateString } from 'class-validator';

export class UpdateCountdownDto {
    // atualizações parciais - o cliente envia apenas o que deseja alterar
    @IsOptional()
    @IsString()
    @MinLength(1)
    title?: string;

    // permite atualizar a data de início se desejar
    @IsOptional()
    @IsDateString()
    startAt?: string;
}