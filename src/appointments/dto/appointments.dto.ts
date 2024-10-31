import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { isBrazilDateFormat } from '../decorator/date-format-brazil.decorator';

export class appointmentsDTO {
  @IsNotEmpty({ message: 'O campo name nao pode ser vazio' })
  @IsString({ message: 'O campo name deve possuir o formato string' })
  @MinLength(3, { message: 'O campo name deve possuir no minimo 3 caracteres' })
  @MaxLength(30, { message: 'O campo deve possuir no maximo 30 caracteres' })
  name?: string;

  @isBrazilDateFormat()
  date?: string;

  @IsNotEmpty({ message: 'O campo local nao pode ser vazio' })
  @IsString({ message: 'O campo local deve possuir o formato string' })
  @MinLength(3, {
    message: 'O campo local deve possuir no minimo 3 caracteres',
  })
  @MaxLength(40, {
    message: 'O campo local deve possuir no maximo 40 caracteres',
  })
  local?: string;
}
