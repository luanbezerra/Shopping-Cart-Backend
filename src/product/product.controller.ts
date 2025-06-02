import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo produto' })
    @ApiResponse({ status: 201, description: 'Produto criado', type: Product })
    @ApiBadRequestResponse({ description: 'Dados inválidos ou produto já existe' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.create(createProductDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os produtos' })
    @ApiResponse({ status: 200, description: 'Array de produtos', type: [Product] })
    @ApiInternalServerErrorResponse({ description: 'Erro ao buscar produtos' })
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um produto pelo ID' })
    @ApiResponse({ status: 200, description: 'Produto encontrado', type: Product })
    @ApiNotFoundResponse({ description: 'Produto não encontrado' })
    findOne(@Param('id') id: string): Promise<Product> {
        return this.productService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Atualiza um produto por ID' })
    @ApiResponse({ status: 200, description: 'Produto atualizado', type: Product })
    @ApiBadRequestResponse({ description: 'Dados inválidos' })
    @ApiNotFoundResponse({ description: 'Produto não encontrado' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Promise<Product> {
        return this.productService.update(+id, updateProductDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Remove um produto por ID' })
    @ApiResponse({ status: 200, description: 'Produto removido', type: Product })
    @ApiNotFoundResponse({ description: 'Produto não encontrado' })
    @ApiBadRequestResponse({ description: 'Erro ao remover o produto' })
    remove(@Param('id') id: string): Promise<Product> {
        return this.productService.remove(+id);
    }
}
