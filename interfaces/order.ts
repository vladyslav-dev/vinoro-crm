import { ORDER_COLORS } from "@/constants/colors";
import { ILangData } from "./general";
import { IBulkPrice } from "./product";

export type TOrderStatus = 'pending' | 'processing' | 'completed';
export type TOrderTitle = 'Не обработанные' | 'В процессе' | 'Доставлено';

export type TOrderColor = keyof typeof ORDER_COLORS;

export interface IOrderStatus {
    icon: JSX.Element;
    title: TOrderTitle;
    color: TOrderColor;
}

export interface IOrderProduct {
    _id: string;
    product_ref: string; // reference to product
    name: ILangData;
    image: string;
    price: number;
    discount_price: number | null;
    bulk_price: Array<IBulkPrice>;
    quantity: number;
    total_price: number;
    current_price: number;
}

export interface IOrder {
    id: string;
    order_id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    city: string;
    local_address: string | null; // Zaporizhzhia address
    post_adress: string | null; // post address
    post_number: string | null; // post index
    payment: string;
    products: IOrderProduct[];
    created_at: string;
    lang: keyof ILangData;
    confirmed: boolean;
    success: boolean;
    order_price: number;
}

export interface IOrderService {
    getAll: () => Promise<IOrder[]>;
    getById: (id: string) => Promise<IOrder>;
    update: (id: string, data: any) => Promise<IOrder>;
}