import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.cartItem.deleteMany();
    await prisma.cart.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    const users = await prisma.user.createMany({
        data: [
            { id: 1, name: 'Thaís Monteiro', email: 'ta@example.com', password: 'senha123' },
            { id: 2, name: 'Naomi Kang Lin', email: 'mih@example.com', password: 'senha456' },
            { id: 3, name: 'Luna', email: 'luna@example.com', password: 'senha789' },
            { id: 4, name: 'Mitinho', email: 'mitinho@example.com', password: 'senha972' },
        ],
    });

    await prisma.cart.createMany({
        data: [
            { id: 1, userId: 1 },
            { id: 2, userId: 2 },
            { id: 3, userId: 3 },
            { id: 4, userId: 4 },
        ],
    });

    await prisma.product.createMany({
        data: [
            {
                id: 1,
                name: 'Produto 1',
                description: 'Descrição do Produto 1',
                price: 199.9,
                stock: 15,
                category: 'Categoria A',
                section: 'Seção 1',
                brand: 'Marca 1',
                imageUrl: 'https://exemplo.com/produto1.jpg',
            },
            {
                id: 2,
                name: 'Produto 2',
                description: 'Descrição do Produto 2',
                price: 99.9,
                stock: 5,
                category: 'Categoria B',
                section: 'Seção 2',
                brand: 'Marca 2',
                imageUrl: 'https://exemplo.com/produto2.jpg',
            },
            {
                id: 3,
                name: 'Produto 3',
                description: 'Descrição do Produto 3',
                price: 449.9,
                stock: 10,
                category: 'Categoria C',
                section: 'Seção 3',
                brand: 'Marca 3',
                imageUrl: 'https://exemplo.com/produto3.jpg',
            },
        ],
    });

    await prisma.cartItem.createMany({
        data: [
            { cartId: 1, productId: 1, quantity: 2 },
            { cartId: 1, productId: 2, quantity: 1 },
            { cartId: 2, productId: 3, quantity: 1 },
        ],
    });

    const order1 = await prisma.order.create({
        data: {
            userId: 3,
            totalValue: 199.9 * 1 + 99.9 * 1,
            items: {
                create: [
                    { productId: 1, quantity: 1 },
                    { productId: 2, quantity: 1 },
                ],
            },
        },
    });

    const order2 = await prisma.order.create({
        data: {
            userId: 1,
            totalValue: 199.9 * 2 + 99.9 * 1,
            items: {
                create: [
                    { productId: 1, quantity: 2 },
                    { productId: 2, quantity: 1 },
                ],
            },
        },
    });

    await prisma.cartItem.deleteMany({ where: { cartId: 1 } });

    const order3 = await prisma.order.create({
        data: {
            userId: 2,
            totalValue: 449.9 * 1,
            items: {
                create: [{ productId: 3, quantity: 1 }],
            },
        },
    });
    await prisma.cartItem.deleteMany({ where: { cartId: 2 } });

    console.log('✅ Seed finalizado!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async e => {
        console.error('❌ Erro no seed:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
