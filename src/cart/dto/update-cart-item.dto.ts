import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateCartItemDto {
    @ApiProperty({ example: 3, description: 'Nova quantidade desejada (mínimo 1)', minimum: 1 })
    @IsNotEmpty({ message: 'A quantidade do produto é obrigatória' })
    @IsNumber({}, { message: 'A quantidade do produto deve ser numérica' })
    @Min(1, { message: 'A quantidade deve ser ao menos 1' })
    quantity: number;
}
