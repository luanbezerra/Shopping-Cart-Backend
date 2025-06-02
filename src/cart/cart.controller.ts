import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':userId')
    @ApiOperation({ summary: 'Retorna o carrinho de um usuário' })
    @ApiResponse({ status: 200, description: 'Carrinho retornado', type: Cart })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
    getCart(@Param('userId') userId: string): Promise<Cart> {
        return this.cartService.getOrCreateCart(+userId);
    }

    @Post(':userId/items')
    @ApiOperation({ summary: 'Adiciona um produto ao carrinho de um usuário' })
    @ApiResponse({ status: 201, description: 'Produto adicionado', type: CartItem })
    @ApiBadRequestResponse({ description: 'Estoque insuficiente ou dados inválidos' })
    @ApiNotFoundResponse({ description: 'Usuário ou produto não encontrado' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    addItem(
        @Param('userId') userId: string,
        @Body() addCartItemDto: AddCartItemDto,
    ): Promise<CartItem> {
        return this.cartService.addItem(+userId, addCartItemDto);
    }

    @Patch(':userId/items/:productId')
    @ApiOperation({ summary: 'Atualiza quantidade de um produto no carrinho' })
    @ApiResponse({ status: 200, description: 'Quantidade atualizada', type: CartItem })
    @ApiBadRequestResponse({ description: 'Estoque insuficiente ou dados inválidos' })
    @ApiNotFoundResponse({ description: 'Usuário, produto ou item não encontrado' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    updateItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
        @Body() updateCartItemDto: UpdateCartItemDto,
    ): Promise<CartItem> {
        return this.cartService.updateItem(+userId, +productId, updateCartItemDto);
    }

    @Delete(':userId/items/:productId')
    @ApiOperation({ summary: 'Remove um item do carrinho' })
    @ApiResponse({ status: 200, description: 'Item removido', type: CartItem })
    @ApiNotFoundResponse({ description: 'Usuário, carrinho ou item não encontrado' })
    removeItem(
        @Param('userId') userId: string,
        @Param('productId') productId: string,
    ): Promise<CartItem> {
        return this.cartService.removeItem(+userId, +productId);
    }

    @Delete(':userId/clear')
    @ApiOperation({ summary: 'Esvazia todo o carrinho de um usuário' })
    @ApiResponse({ status: 200, description: 'Carrinho esvaziado (0 itens)', type: Object })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado' })
    clearCart(@Param('userId') userId: string) {
        return this.cartService.clearCart(+userId);
    }
}
