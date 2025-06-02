import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do usuário', type: String })
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    @IsString({ message: 'O nome deve ser texto' })
    name: string;

    @ApiProperty({ example: 'joao@example.com', description: 'E-mail do usuário', type: String })
    @IsNotEmpty({ message: 'O e-mail não pode estar vazio' })
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email: string;

    @ApiProperty({
        example: 'senha123',
        description: 'Senha do usuário (mínimo 8 caracteres)',
        minLength: 8,
        type: String,
    })
    @IsNotEmpty({ message: 'A senha não pode estar vazia' })
    @IsString({ message: 'A senha deve ser texto' })
    @MinLength(8, { message: 'A senha deve ter ao menos 8 caracteres' })
    password: string;
}
