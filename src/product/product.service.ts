import {
    Injectable,
    NotFoundException,
    BadRequestException,
    InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createProductDto: CreateProductDto): Promise<Product> {
        try {
            return await this.prisma.product.create({
                data: {
                    ...createProductDto,
                    stock: createProductDto.stock ?? 0,
                },
            });
        } catch (error) {
            if (
                error.code === 'P2002' &&
                Array.isArray(error.meta?.target) &&
                (error.meta?.target as string[]).includes('name')
            ) {
                throw new BadRequestException('Nome de produto já existe');
            }
            throw new BadRequestException('Não foi possível criar esse produto');
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.prisma.product.findMany();
        } catch (error) {
            throw new InternalServerErrorException('Não foi possível buscar os produtos.');
        }
    }

    async findOne(id: number): Promise<Product> {
        const product = await this.prisma.product.findUnique({ where: { id } });
        if (!product) throw new NotFoundException('Produto não encontrado');
        return product;
    }

    async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
        await this.findOne(id);
        try {
            return await this.prisma.product.update({
                where: { id },
                data: updateProductDto,
            });
        } catch (error) {
            if (
                error.code === 'P2002' &&
                Array.isArray(error.meta?.target) &&
                (error.meta?.target as string[]).includes('name')
            ) {
                throw new BadRequestException('Nome de produto já existe');
            }
            throw new BadRequestException('Erro ao atualizar o produto.');
        }
    }

    async remove(id: number): Promise<Product> {
        await this.findOne(id);
        try {
            return await this.prisma.product.delete({ where: { id } });
        } catch (error) {
            throw new BadRequestException('Erro ao remover o produto');
        }
    }
}
