import { OrderItem } from './order-item.entity';

export class Order {
    id: number;
    totalValue: number;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    items?: OrderItem[];
}
