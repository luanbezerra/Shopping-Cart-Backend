import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsPositive, IsOptional, IsUrl, Min } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiPropertyOptional({ example: 'Novo produto', description: 'Nome atualizado do produto' })
    @IsOptional()
    @IsString({ message: 'O nome deve ser texto' })
    name?: string;

    @ApiPropertyOptional({
        example: 'Nova descrição',
        description: 'Descrição atualizada do produto',
    })
    @IsOptional()
    @IsString({ message: 'A descrição deve ser texto' })
    description?: string;

    @ApiPropertyOptional({ example: 119.9, description: 'Preço atualizado' })
    @IsOptional()
    @IsNumber({}, { message: 'O preço deve ser numérico' })
    @IsPositive({ message: 'O preço deve ser maior que zero' })
    price?: number;

    @ApiPropertyOptional({ example: 15, description: 'Estoque atualizado' })
    @IsOptional()
    @IsNumber({}, { message: 'O estoque deve ser numérico' })
    @Min(0, { message: 'O estoque não pode ser negativo' })
    stock?: number;

    @ApiPropertyOptional({ example: 'Nova categoria', description: 'Categoria atualizada' })
    @IsOptional()
    @IsString({ message: 'A categoria deve ser texto' })
    category?: string;

    @ApiPropertyOptional({ example: 'feminina', description: 'Seção atualizada' })
    @IsOptional()
    @IsString({ message: 'A seção deve ser texto' })
    section?: string;

    @ApiPropertyOptional({ example: 'Nova Zara', description: 'Marca atualizada' })
    @IsOptional()
    @IsString({ message: 'A marca deve ser texto' })
    brand?: string;

    @ApiPropertyOptional({
        example: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
        description: 'Nova URL da imagem',
    })
    @IsOptional()
    @IsUrl({}, { message: 'A imageUrl deve ser uma URL válida' })
    imageUrl?: string;
}
