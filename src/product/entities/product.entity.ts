export class Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    section: string;
    brand: string;
    imageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
