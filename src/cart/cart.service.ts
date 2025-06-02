import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';

@Injectable()
export class CartService {
    constructor(private readonly prisma: PrismaService) {}

    private async ensureUserExists(userId: number) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('Usuário não encontrado');
    }

    async getOrCreateCart(userId: number): Promise<Cart> {
        await this.ensureUserExists(userId);

        let cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { items: true },
        });

        if (!cart) {
            cart = await this.prisma.cart.create({
                data: { userId },
                include: { items: true },
            });
        }
        return cart;
    }

    async addItem(userId: number, dto: AddCartItemDto): Promise<CartItem> {
        const { productId, quantity } = dto;

        await this.ensureUserExists(userId);

        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });

        if (!product) throw new NotFoundException('Produto não encontrado');
        const cart = await this.getOrCreateCart(userId);
        const existingItem = await this.prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId } },
        });

        if (existingItem) {
            const novaQuantidadeTotal = existingItem.quantity + quantity;
            if (product.stock < novaQuantidadeTotal) {
                throw new BadRequestException(
                    `Estoque insuficiente. Já há ${existingItem.quantity} no carrinho e deseja adicionar ${quantity}, mas só restam ${product.stock} em estoque.`,
                );
            }
            return this.prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: novaQuantidadeTotal,
                },
            });
        }

        if (product.stock < quantity) {
            throw new BadRequestException(
                `Estoque insuficiente. Deseja adicionar ${quantity}, mas só restam ${product.stock} em estoque.`,
            );
        }

        return this.prisma.cartItem.create({
            data: {
                cartId: cart.id,
                productId,
                quantity,
            },
        });
    }

    async updateItem(userId: number, productId: number, dto: UpdateCartItemDto): Promise<CartItem> {
        const { quantity: novaQuantidade } = dto;

        await this.ensureUserExists(userId);

        const cart = await this.getOrCreateCart(userId);

        const item = await this.prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId } },
        });
        if (!item) throw new NotFoundException('Item não existe no carrinho');

        const product = await this.prisma.product.findUnique({
            where: { id: productId },
        });
        if (!product) throw new NotFoundException('Produto não encontrado');

        if (novaQuantidade > item.quantity && product.stock < novaQuantidade) {
            throw new BadRequestException(
                `Estoque insuficiente. Já há ${item.quantity} no carrinho e deseja aumentar para ${novaQuantidade}, mas só restam ${product.stock} em estoque.`,
            );
        }

        return this.prisma.cartItem.update({
            where: { id: item.id },
            data: { quantity: novaQuantidade },
        });
    }

    async removeItem(userId: number, productId: number): Promise<CartItem> {
        await this.ensureUserExists(userId);

        const cart = await this.getOrCreateCart(userId);

        const item = await this.prisma.cartItem.findUnique({
            where: { cartId_productId: { cartId: cart.id, productId } },
        });
        if (!item) throw new NotFoundException('Item não existe no carrinho');

        return this.prisma.cartItem.delete({ where: { id: item.id } });
    }

    async clearCart(userId: number): Promise<{ count: number }> {
        await this.ensureUserExists(userId);

        const cart = await this.getOrCreateCart(userId);

        return this.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
}
