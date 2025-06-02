import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(private readonly prisma: PrismaService) {}

    private async ensureUserExists(userId: number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');
    }

    async create(userId: number): Promise<Order> {
        await this.ensureUserExists(userId);

        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        });
        if (!cart) {
            throw new NotFoundException('Carrinho não encontrado para este usuário');
        }

        const cartItems = cart.items;
        if (cartItems.length === 0) {
            throw new BadRequestException('Carrinho vazio');
        }

        let totalValue = 0;
        for (const item of cartItems) {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
            });
            if (!product) {
                throw new NotFoundException(`Produto com ID ${item.productId} não existe`);
            }
            if (product.stock < item.quantity) {
                throw new BadRequestException(
                    `Estoque insuficiente para "${product.name}". 
          Há ${item.quantity} no carrinho mas só restam ${product.stock}.`,
                );
            }

            totalValue += product.price * item.quantity;

            await this.prisma.product.update({
                where: { id: product.id },
                data: { stock: product.stock - item.quantity },
            });
        }

        const order = await this.prisma.order.create({
            data: { userId, totalValue },
        });

        for (const item of cartItems) {
            await this.prisma.orderItem.create({
                data: {
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                },
            });
        }

        await this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

        return this.prisma.order.findUniqueOrThrow({
            where: { id: order.id },
            include: { items: true },
        });
    }

    async findAll(): Promise<Order[]> {
        return this.prisma.order.findMany({ include: { items: true } });
    }

    async findByUser(userId: number): Promise<Order[]> {
        await this.ensureUserExists(userId);

        const orders = await this.prisma.order.findMany({
            where: { userId },
            include: { items: true },
        });
        if (orders.length === 0) {
            throw new NotFoundException('Usuário não realizou nenhum pedido');
        }
        return orders;
    }

    async findOne(id: number): Promise<Order> {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { items: true },
        });
        if (!order) {
            throw new NotFoundException(`Pedido com ID ${id} não encontrado`);
        }
        return order;
    }

    async remove(id: number): Promise<Order> {
        await this.findOne(id);
        return this.prisma.order.delete({ where: { id } });
    }
}
