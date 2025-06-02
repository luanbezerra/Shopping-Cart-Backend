import { Controller, Get, Post, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';

import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBadRequestResponse,
    ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post(':userId')
    @ApiOperation({ summary: 'Finaliza compra (cria novo pedido) para um usuário' })
    @ApiResponse({ status: 201, description: 'Pedido criado com sucesso', type: Order })
    @ApiBadRequestResponse({ description: 'Carrinho vazio ou estoque insuficiente' })
    @ApiNotFoundResponse({ description: 'Usuário ou carrinho não encontrado' })
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Param('userId') userId: string): Promise<Order> {
        return this.orderService.create(+userId);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os pedidos' })
    @ApiResponse({ status: 200, description: 'Array de pedidos', type: [Order] })
    findAll(): Promise<Order[]> {
        return this.orderService.findAll();
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Lista pedidos de um usuário específico' })
    @ApiResponse({ status: 200, description: 'Array de pedidos do usuário', type: [Order] })
    @ApiNotFoundResponse({ description: 'Usuário não encontrado ou sem pedidos' })
    findByUser(@Param('userId') userId: string): Promise<Order[]> {
        return this.orderService.findByUser(+userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Busca um pedido pelo ID' })
    @ApiResponse({ status: 200, description: 'Pedido encontrado', type: Order })
    @ApiNotFoundResponse({ description: 'Pedido não encontrado' })
    findOne(@Param('id') id: string): Promise<Order> {
        return this.orderService.findOne(+id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Deleta um pedido pelo ID' })
    @ApiResponse({ status: 200, description: 'Pedido removido', type: Order })
    @ApiNotFoundResponse({ description: 'Pedido não encontrado' })
    remove(@Param('id') id: string): Promise<Order> {
        return this.orderService.remove(+id);
    }
}
