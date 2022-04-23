import { IProduct } from '@/interfaces/product';
import { ILangData } from '@/interfaces/general';
import { ISelectData } from '@/components/UI/Select';

export interface ICategory {
    id: string;
    order_id: number;
    category_name: ILangData;
    category_image: string;
    visibility: boolean;
    catalog: string
}

export interface ICategoryData extends Omit<ICategory, 'order_id'> {}

export interface ICategoryForm extends Omit<ICategoryData, 'catalog'> {
    catalogSelect: ISelectData[]
}

export interface ICategoryService {
    getAll: () => Promise<ICategory[]>;
    getOne: (id: string) => Promise<ICategory>;
    create: (data: ICategoryData) => Promise<ICategory>;
    update: (data: ICategoryData) => Promise<ICategory>;
}