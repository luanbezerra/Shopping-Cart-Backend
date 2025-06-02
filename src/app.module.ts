import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';

@Module({
    imports: [UserModule, ProductModule, CartModule, OrderModule, PrismaModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
