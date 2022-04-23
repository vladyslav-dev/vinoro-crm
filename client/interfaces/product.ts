import { ISelectData } from '@/components/UI/Select';
import { ILangData } from '@/interfaces/general';

export interface IBulkPrice {
    id: string;
    from: number;
    price: number;
}

export interface IFormBulkPrice {
    id: string;
    from: string;
    price: string;
}

export interface IProductOrder {
    id: string;
    order_id: number;
}

export interface IProduct {
    id: string;
    order_id: number;
    name: ILangData;
    description: ILangData;
    image: string;
    price: number;
    discount_price: number | null;
    bulk_price: Array<IBulkPrice>;
    new: boolean;
    product_count: number;
    availability: boolean;
    visibility: boolean;
    published_date: Date;
    modified_date: Date;
    category: string;
}

export interface IProductData extends Omit<IProduct, 'new' | 'order_id' | 'product_count' | 'published_date' | 'modified_date' > {}

export interface IProductForm extends Omit<IProduct,
'id' | 'order_id' | 'bulk_price' | 'product_count' | 'price' |
'discount_price' | 'image' | 'category' | 'published_date' | 'modified_date'
> {
    catalogSelect: ISelectData[];
    categorySelect: ISelectData[];
    bulk_price: Array<IFormBulkPrice>;
    price: string;
    discount_price: string;
    image: string;
    published_date: string;
    modified_date: string;
}

export interface IProductService {
    getAll: () => Promise<IProduct[]>;
    getByCategoryId: (categoryId: string) => Promise<IProduct[]>;
    getOne: (id: string) => Promise<IProduct>;
    getDiscountedProducts: () => Promise<IProduct[]>;
    getNewProducts: () => Promise<IProduct[]>;
    create: (product: IProductData) => Promise<IProduct>;
    update: (product: IProductData) => Promise<IProduct>;
    updateProductOrder: (products: IProductOrder[]) => any;
}