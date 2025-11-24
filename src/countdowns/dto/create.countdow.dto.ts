import { IsString, MinLength } from 'class-validator';

export class CreateCountdownDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsString()
  userId: string;
}
