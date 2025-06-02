import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class AddCartItemDto {
    @ApiProperty({ example: 1, description: 'ID do produto a ser adicionado' })
    @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
    @IsNumber({}, { message: 'O ID do produto deve ser numérico' })
    productId: number;

    @ApiProperty({ example: 2, description: 'Quantidade a adicionar (mínimo 1)', minimum: 1 })
    @IsNotEmpty({ message: 'A quantidade do produto é obrigatória' })
    @IsNumber({}, { message: 'A quantidade do produto deve ser numérica' })
    @Min(1, { message: 'A quantidade deve ser ao menos 1' })
    quantity: number;
}
