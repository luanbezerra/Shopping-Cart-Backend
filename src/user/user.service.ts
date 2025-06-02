import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const user = await this.prisma.user.create({
                data: createUserDto,
            });
            return user;
        } catch (error: any) {
            if (
                error.code === 'P2002' &&
                Array.isArray(error.meta?.target) &&
                (error.meta?.target as string[]).includes('email')
            ) {
                throw new BadRequestException('Email já cadastrado');
            }
            throw new BadRequestException('Não foi possível criar o usuário');
        }
    }

    async findAll(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        await this.findOne(id);

        try {
            const updated = await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
            return updated;
        } catch (error: any) {
            if (
                error.code === 'P2002' &&
                Array.isArray(error.meta?.target) &&
                (error.meta?.target as string[]).includes('email')
            ) {
                throw new BadRequestException('Email já existe');
            }
            throw new BadRequestException('Não foi possível criar o usuário');
        }
    }

    async remove(id: number): Promise<User> {
        await this.findOne(id);
        return this.prisma.user.delete({ where: { id } });
    }

    async login(loginDto: LoginUserDto): Promise<User> {
        const { email, password } = loginDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== password) {
            throw new BadRequestException('Credenciais inválidas');
        }
        return user;
    }
}
