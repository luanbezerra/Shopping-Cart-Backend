import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, MinLength, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiPropertyOptional({ example: 'Luis', description: 'Nome completo do usuário' })
    @IsOptional()
    @IsString({ message: 'O nome deve ser texto' })
    name?: string;

    @ApiPropertyOptional({ example: 'humilimo@example.com', description: 'E-mail do usuário' })
    @IsOptional()
    @IsEmail({}, { message: 'Formato de e-mail inválido' })
    email?: string;

    @ApiPropertyOptional({
        example: 'novaSenha123',
        description: 'Senha do usuário (mínimo 8 caracteres)',
    })
    @IsOptional()
    @IsString({ message: 'A senha deve ser texto' })
    @MinLength(8, { message: 'A senha deve ter ao menos 8 caracteres' })
    password?: string;
}
