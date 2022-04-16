import { ILangData } from '@/interfaces/general';
import { ICatalog } from '@/interfaces/catalog';
import { ICategory } from '@/interfaces/category';
import { IBulkPrice, IFormBulkPrice, IProduct, IProductForm } from '@/interfaces/product';
import { ISelectData } from '@/components/UI/Select';
import { FieldErrors, UseFormWatch } from 'react-hook-form';

interface IProductPreviewOptions {
    initialSelectedCategoryValue: string;
    selectedCategoryValue: string;
    initialValues: IProductForm;
    getField: UseFormWatch<IProductForm>;
    errors: FieldErrors;
    isUpdateProduct: boolean;
}

export type SelectDataVariant = ICatalog[] | ICategory[];

export type IFilteredCategory = {
    [key: string]: any;
}

export type TTransformToSelectData = (data: SelectDataVariant, value: string, lang?: keyof ILangData) => ISelectData[];
export type TTransformFilteredCategory = (fiilteredCategory: IFilteredCategory, value: string, lang?: keyof ILangData) => IFilteredCategory;
export type TFilterCategory = (category: ICategory[]) => IFilteredCategory;
export type TGetLangField = (field: any, lang?: keyof ILangData) => string;
export type TCompareLangFields = (arr1: ILangData, arr2: ILangData) => boolean;

export const transformToSelectData: TTransformToSelectData = (data, value, lang = 'ru') => (
    // Transform data for <Select>
    data.map((item: any, index: number) => ({
        id: item.id,
        value: item![value][lang],
        selected: !!(index === 0)
    }))
)

export const filterCategory: TFilterCategory = (category) => {
    // Filter category for each catalog id key { [catalogId] : [ category ] }

    const fiilteredCategory: IFilteredCategory = {};

    for(let item of category) {
        const tmp = fiilteredCategory[item['catalog']]
        fiilteredCategory[item['catalog']] = tmp ? [...tmp, item] : [item];
    }
    return fiilteredCategory;
}

export const transformFilteredCategory: TTransformFilteredCategory = (fiilteredCategory, value, lang = 'ru') => {
    for(let key in fiilteredCategory) {
        fiilteredCategory[key] = transformToSelectData(fiilteredCategory[key], value, lang)
    }
    // Filtered category data by catalog[id] for <Select>

    return fiilteredCategory;
}

export const getSelectedCatalogId = (newValue: ISelectData[]) => {
    const selectedCatalog = newValue.find(item => item.selected);
    return selectedCatalog!.id;
}

export const transformBulkPriceToEdit = (bulkPrice: IBulkPrice[]): IFormBulkPrice[] => (
    bulkPrice.map((item: IBulkPrice) => ({
        id: item.id,
        from: String(item.from),
        price: String(item.price)
    }))
)

export const transformBulkPriceToNumber = (bulkPrice: IFormBulkPrice[]) => (
    bulkPrice.map(item => ({
            from: Number(item.from),
            price: Number(item.price)
    }))
)

export const transformBulkPriceToString = (bulkPrice: IFormBulkPrice[]): string => (
    bulkPrice.map(item => `${item.price} UAH от ${item.from}шт.`).join(' | ')
)

export const getLangField: TGetLangField = (field, lang = 'ru') => field[lang];

export const getSelectedCategory = (data: ISelectData[]) => (
    data.find((item: any) => item.selected)
)

export const compareLangFields: TCompareLangFields = (arr1, arr2) => (
    JSON.stringify(arr1) === JSON.stringify(arr2)
)

export const compareBulkPrice = (arr1: Array<IFormBulkPrice>, arr2: Array<IFormBulkPrice>) => {
    if (arr1.length === arr2.length) {
        return !!(arr2.filter((item1: any) => !arr1.some((item2: any) => {
            return item1.from === item2.from && item1.price === item2.price
        })).length)
    } else {
        return true
    }
}

export const setInitialValues = (catalog: ICatalog[], category: ICategory[], product?: IProduct) => {
    const transformedCategory: IFilteredCategory =
                        transformFilteredCategory(filterCategory(category), 'category_name', 'ru');

    const transformedCatalog: ISelectData[] = transformToSelectData(catalog, 'catalog_name', 'ru');

    return {
        name: {
            ru: product?.name.ru || '',
            uk: product?.name.uk || '',
            en: product?.name.en || '',
        },
        description: {
            ru: product?.description.ru || '',
            uk: product?.description.uk || '',
            en: product?.description.en || '',
        },
        image: product?.image || '',
        price: String(product?.price || ''),
        discount_price: String(product?.discount_price || ''),
        bulk_price: transformBulkPriceToEdit(product?.bulk_price || []),
        availability: product?.availability ?? true,
        visibility: product?.visibility ?? true,
        new: product?.new || false,
        catalogSelect: transformedCatalog,
        categorySelect: transformedCategory[getSelectedCatalogId(transformedCatalog)],
        published_date: !!(product?.published_date) ? String(new Date(product!.published_date).toLocaleString('uk')) : '',
        modified_date: !!(product?.modified_date) ? String(new Date(product!.modified_date).toLocaleString('uk')) : '',
    }
}

export const setProductPreview = (options: IProductPreviewOptions) => {

    const {
        initialSelectedCategoryValue, // memoized value
        selectedCategoryValue, // memoized value
        initialValues, // initial form values
        getField, // watch
        errors, // errors
        isUpdateProduct // type of form
     } = options;

    const IND = 'Не указано'; // Is not defined field;

    const nameField = getLangField(getField('name'), 'ru');
    const descriptionField = getLangField(getField('description'), 'ru');
    const bulkPriceField = transformBulkPriceToString(getField('bulk_price'));

    const config = [
        {
            title: 'Изображение',
            path: 'image',
            data: {
                value: 'image' in errors ? IND : getField('image') || IND,
                field:   getField('image')
            },
            required: true,
            type: 'image',
            isUpdated: !(!!(initialValues.image === getField('image'))),
            IND
        },
        {
            title: 'Название',
            path: 'name',
            data: {
                value: 'name' in errors ? IND : nameField || IND,
                field:  nameField
            },
            required: true,
            type: 'text',
            isUpdated: !compareLangFields(initialValues.name, getField('name')),
            IND
        },
        {
            title: 'Описание',
            path: 'description',
            data: {
                value: 'description' in errors ? IND : descriptionField || IND,
                field:  descriptionField
            },
            required: true,
            type: 'text',
            isUpdated: !compareLangFields(initialValues.description, getField('description')),
            IND
        },
        {
            title: 'Цена',
            path: 'price',
            data: {
                value:'price' in errors ? IND : getField('price') ? `${getField('price')} UAH` : IND,
                field:  getField('price')
            },
            required: true,
            type: 'text',
            isUpdated: !(!!(initialValues.price === getField('price'))),
            IND
        },
        {
            title: 'Цена по скидке',
            path: 'price',
            data: {
                value: 'discount_price' in errors ? IND : getField('discount_price') ? `${getField('discount_price')} UAH` : IND,
                field:  getField('discount_price')
            },
            required: false,
            type: 'text',
            isUpdated: !(!!(initialValues.discount_price === getField('discount_price'))),
            IND
        },
        {
            title: 'Оптовые цены',
            path: 'bulk_price',
            data: {
                value: 'bulk_price' in errors ? IND : bulkPriceField || IND,
                field:  getField('bulk_price')
            },
            required: ('bulk_price' in errors) && bulkPriceField.length,
            type: 'text',
            isUpdated: compareBulkPrice(initialValues.bulk_price, getField('bulk_price')),
            IND
        },
        {
            title: 'Наличие',
            path: 'availability',
            data: {
                value: getField('availability') ? 'Есть в наличии' : 'Нет в наличии',
                field:  getField('availability')
            },
            required: true,
            type: 'boolean',
            isUpdated: !(!!(initialValues.availability === getField('availability'))),
            IND
        },
        {
            title: 'Видимость',
            path: 'visibility',
            data: {
                value: getField('visibility') ? 'Показ включен' : 'Показ приостановлен',
                field:  getField('visibility')
            },
            required: true,
            type: 'boolean',
            isUpdated: !(!!(initialValues.visibility === getField('visibility'))),
            IND
        },
        {
            title: 'Категория',
            path: 'catalogSelect',
            data: {
                value: selectedCategoryValue,
                field:  selectedCategoryValue
            },
            required: true,
            type: 'text',
            isUpdated: !(!!(initialSelectedCategoryValue === selectedCategoryValue)),
            IND
        },
    ]

    const updateProductConfig = [
        {
            title: 'Статус новый',
            path: '',
            data: {
                value: getField('new') ? 'Да' : 'Нет',
                field:  getField('new')
            },
            required: false,
            type: 'boolean',
            isUpdated: false,
            IND
        },
        {
            title: 'Дата создания',
            path: '',
            data: {
                value: getField('published_date'),
                field:  getField('published_date')
            },
            required: false,
            type: 'text',
            isUpdated: false,
            IND
        },
        {
            title: 'Дата изменения',
            path: '',
            data: {
                value: getField('modified_date'),
                field:  getField('modified_date')
            },
            required: false,
            type: 'text',
            isUpdated: false,
            IND
        }
    ]

    return isUpdateProduct ? [...config, ...updateProductConfig] : config
}