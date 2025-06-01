import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'joao@example.com', description: 'E-mail cadastrado do usuário' })
  @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
  @IsEmail({}, { message: 'Formato de e-mail inválido' })
  email: string;

  @ApiProperty({ example: 'senha123', description: 'Senha cadastrada do usuário' })
  @IsNotEmpty({ message: 'A senha não pode estar vazia' })
  @IsString({ message: 'A senha deve ser texto' })
  password: string;
}