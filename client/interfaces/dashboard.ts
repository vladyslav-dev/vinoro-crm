import { ILangData } from './general';

export interface ICatalogInfo {
    catalogId: string;
    catalogName: ILangData;
    icon: string;
    linkName: string;
    totalCategory: number;
    totalProducts: number;
}

export interface IDashboardInfo {
    catalogInfo: ICatalogInfo[];
    totalOrders: number;
    totalProducts: number;
    totalNewProducts: number;
    totalDiscountPriceProducts: number;
}

export interface IDashboardService {
    getInfo: () => Promise<IDashboardInfo>;
}