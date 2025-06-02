import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsPositive,
    IsOptional,
    IsUrl,
    Min,
} from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ example: 'Produto 1', description: 'Nome do produto' })
    @IsNotEmpty({ message: 'O nome é obrigatório' })
    @IsString({ message: 'O nome deve ser texto' })
    name: string;

    @ApiProperty({ example: 'Descrição 1', description: 'Descrição do produto' })
    @IsNotEmpty({ message: 'A descrição é obrigatória' })
    @IsString({ message: 'A descrição deve ser texto' })
    description: string;

    @ApiProperty({ example: 109.0, description: 'Preço do produto' })
    @IsNotEmpty({ message: 'O preço é obrigatório' })
    @IsNumber({}, { message: 'O preço deve ser numérico' })
    @IsPositive({ message: 'O preço deve ser maior que zero' })
    price: number;

    @ApiPropertyOptional({ example: 10, description: 'Quantidade em estoque (padrão 0)' })
    @IsOptional()
    @IsNumber({}, { message: 'O estoque deve ser numérico' })
    @Min(0, { message: 'O estoque não pode ser negativo' })
    stock?: number;

    @ApiProperty({ example: 'Categoria 1', description: 'Categoria do produto' })
    @IsNotEmpty({ message: 'A categoria é obrigatória' })
    @IsString({ message: 'A categoria deve ser texto' })
    category: string;

    @ApiProperty({ example: 'masculina', description: 'Seção do produto' })
    @IsNotEmpty({ message: 'A seção é obrigatória' })
    @IsString({ message: 'A seção deve ser texto' })
    section: string;

    @ApiProperty({ example: 'Zara', description: 'Marca do produto' })
    @IsOptional()
    @IsString({ message: 'A marca deve ser texto' })
    brand: string;

    @ApiPropertyOptional({
        example: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        description: 'URL da imagem (opcional)',
    })
    @IsOptional()
    @IsUrl({}, { message: 'A imageUrl deve ser uma URL válida' })
    imageUrl?: string;
}
