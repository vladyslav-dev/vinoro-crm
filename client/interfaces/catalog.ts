import { ILangData } from '@/interfaces/general';
import { PipelinePromise } from 'stream';

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
    getInfo: () => Promise<any>;
    createCatalog: (data: ICatalogData) => Promise<ICatalog>;
    updateCatalog: (id: string) => Promise<ICatalog>;
}