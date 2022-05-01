import { ILangData } from '@/interfaces/general';

export interface ICatalog {
    id: string;
    order_id: number;
    catalog_name: ILangData;
    catalog_image: string;
    visibility: boolean;
}

export interface ICatalogData extends Omit<ICatalog, 'id' | 'order_id'> {}

export interface ICatalogService {
    getAll: () => Promise<ICatalog[]>;
    createCatalog: (data: ICatalogData) => Promise<ICatalog>;
}