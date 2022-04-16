/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import styles from './ProductForm.module.scss';
import { useRouter } from 'next/router';
import FormSection from '@/components/FormSection';
import InputText from '@/components/UI/InputText';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICategory } from '@/interfaces/category';
import { ICatalog } from '@/interfaces/catalog';
import { AlertState } from '@/interfaces/alert';
import Select, { ISelectData } from '@/components/UI/Select';
import ProductPreview from '@/components/ProductPreview';
import FormController from '@/components/FormController';
import ProductService from '@/services/ProductService';
import InputPrice from '@/components/UI/InputPrice';
import InputImage from '@/components/UI/InputImage';
import Textarea from '@/components/UI/Textarea';
import BulkPrice from '@/components/BulkPrice';
import Switch from '@/components/UI/Switch';
import Loader from '@/components/Loader';
import Alert from '@/components/Alert';
import uniqid from 'uniqid';
import {
    IProduct,
    IFormBulkPrice,
    IProductForm,
    IProductData } from '@/interfaces/product';
import {
    filterCategory,
    transformFilteredCategory,
    IFilteredCategory,
    getSelectedCatalogId,
    transformBulkPriceToNumber,
    getSelectedCategory,
    setProductPreview,
    setInitialValues
} from '@/utils/form';

const validationSchema = yup.object().shape({
    name: yup.object().shape({
        ru: yup.string().required('Name should not be empty'),
        uk: yup.string().required('Name should not be empty'),
        en: yup.string().required('Name should not be empty'),
    }),
    description: yup.object().shape({
        ru: yup.string().required('Description should not be empty'),
        uk: yup.string().required('Description should not be empty'),
        en: yup.string().required('Description should not be empty'),
    }),
    image: yup.string().required('Image should be uploaded'),
    price: yup.string().required('Price should not be empty'),
    discount_price: yup.string(),
    bulk_price: yup.array().of(yup.object().shape({
        id: yup.string().required(),
        from: yup.string().required(),
        price: yup.string().required(),
    })),
    published_date: yup.string(),
    modified_date: yup.string(),
    new: yup.boolean(),
});

interface ProductFormProps {
    product?: IProduct;
    catalog: ICatalog[];
    category: ICategory[];
    type: 'update' | 'create'
}

const ProductForm: React.FC<ProductFormProps> = ({
    product,
    catalog,
    category,
    type
}) => {
    console.log('rerender Product Form')

    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertState>({
        isActive: false,
        type: 'success',
        textContent: ''
    });

    const transformedCategory: IFilteredCategory = useMemo(() => {
        return transformFilteredCategory(filterCategory(category), 'category_name', 'ru');
    }, [category]);

    const [formState, setFormState] = useState<IProductForm>(() => setInitialValues(catalog, category, product));


    const { register, control, trigger, watch, setValue, getValues, handleSubmit, reset, formState: { isValid, errors } } = useForm<IProductForm>({
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: formState,
        resolver: yupResolver(validationSchema)
    });

    useEffect(() => {
        trigger()
    }, [])

    const initialSelectedCategoryValue: string = useMemo(() => {
        return getSelectedCategory(watch('categorySelect'))?.value!
    }, []);

    const selectedCategoryValue: string = useMemo(() => {
        console.log('updated selected category value')
        return getSelectedCategory(watch('categorySelect'))?.value!
    }, [watch('categorySelect')])

    const updateCategorySelect = (newValue: ISelectData[]) => {
        const catalogId = getSelectedCatalogId(newValue);
        catalogId && setValue('categorySelect', transformedCategory[catalogId], { shouldValidate: true })
    }

    const setBulkPrice = (value: IFormBulkPrice[]) => {
        setValue('bulk_price', value, { shouldValidate: true });
        trigger();
        return watch('bulk_price');
    }

    const deleteBulkPriceRow = (event: React.MouseEvent) => {
        const bulkPriceList = watch('bulk_price') as IFormBulkPrice[];
        const element = event.currentTarget as HTMLSpanElement;
        const id = element.id

        return setBulkPrice([...bulkPriceList.filter((item: any) => item.id !== String(id))]);
    }

    const deleteAllRows = () => setBulkPrice([]);

    const addBulkPriceRow = () => {
        const bulkPriceList = watch('bulk_price') as IFormBulkPrice[];
        return setBulkPrice([...bulkPriceList, { id: uniqid(), from: '', price: '' }]);
    }

    const submitForm = async (data: IProductForm) => {

        // set Loading background
        setIsUpdating(true)

        const fetchData: any = {
            name: data.name,
            description: data.description,
            image: data.image,
            price: Number(data.price),
            discount_price: Number(data.discount_price) || null,
            bulk_price: transformBulkPriceToNumber(data.bulk_price),
            availability: data.availability,
            visibility: data.visibility,
            category: data.categorySelect.find(item => item.selected)?.id,
        }

        type === 'update' && (fetchData['id'] = product!.id) // add key id if form type update

        if (type === 'create') {
            ProductService.create(fetchData as IProductData)
                .then(createdProduct => {

                    // remove Loading background
                    setIsUpdating(false)

                    // show alert success
                    setAlert({
                        isActive: true,
                        type: 'success',
                        textContent: 'Товар успешно создан'
                    })

                    // redirect to edit page after 2500ms
                    setTimeout(() => {
                        router.push(`/edit-product/${createdProduct.id}`)
                    }, 2500)
                })
                .catch(err => {
                     // remove Loading background
                    setIsUpdating(false)


                    setTimeout(() => {
                        setAlert((prevState => ({
                            ...prevState,
                            isActive: false,
                        })))
                    }, 2500)
                    reset();
                    console.log(err)
                })
        }

        if (type === 'update') {
            // const updatedProduct = await ProductService.update(fetchData as IProductData);

            ProductService.update(fetchData as IProductData)
                .then(updatedProduct => {
                   // console.log(updatedProduct)
                    const initValues: IProductForm = setInitialValues(catalog, category, updatedProduct)

                    setFormState(() => initValues)
                    reset(initValues)

                    setAlert({
                        isActive: true,
                        type: 'success',
                        textContent: 'Товар успешно обновлен'
                    })
                })
                .catch(err => {
                    setAlert({
                        isActive: true,
                        type: 'error',
                        textContent: 'Ошибка при обновлении'
                    })
                    console.log(err)
                })
                .finally(() => {

                    setIsUpdating(false)

                    setTimeout(() => {
                        setAlert((prevState => ({
                            ...prevState,
                            isActive: false,
                        })))
                    }, 2500)
                })
        }
    }



    const productPreviewConfig = setProductPreview({
        initialSelectedCategoryValue,
        selectedCategoryValue,
        getField: watch,
        initialValues: formState,
        errors,
        isUpdateProduct: type === 'update'
    })

    const isSomeFieldUpdated = productPreviewConfig.some((item: any) => item.isUpdated);

    return (
        <div className={`${styles.form} ${isUpdating ? styles.updating : ''}`}>
            <div className={styles.formRow}>
                <div className={styles.formCol}>
                    <div className={styles.formSection} id='name'>
                        <FormSection title='Название' color='COLOR_JORDY_BLUE'>
                            <div className={styles.formItem}>
                                <InputText
                                    label='Название — RU'
                                    registerPath='name.ru'
                                    register={register}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <InputText
                                    label='Название — UK'
                                    registerPath='name.uk'
                                    register={register}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <InputText
                                    label='Название — EN'
                                    registerPath='name.en'
                                    register={register}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='description' >
                        <FormSection title='Описание' color='COLOR_MADANG'>
                            <div className={styles.formItem}>
                                <Textarea
                                    label='Описание — RU'
                                    registerPath='description.ru'
                                    register={register}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Textarea
                                    label='Описание — UK'
                                    registerPath='description.uk'
                                    register={register}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Textarea
                                    label='Описание — EN'
                                    registerPath='description.en'
                                    register={register}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='price'>
                        <FormSection title='Цена' color='COLOR_SEA_PINK'>
                            <div className={styles.formItem}>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field: { onChange, value } } ) => (
                                        <InputPrice
                                            label='Стоимость'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Controller
                                    name="discount_price"
                                    control={control}
                                    render={({ field: { onChange, value } } ) => (
                                        <InputPrice
                                            label='Стоимость со скидкой'
                                            value={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='bulk_price'>
                        <FormSection title='Оптовая цена' color='COLOR_CREAM_BRULEE' updateHeight={() => watch('bulk_price')}>
                            <div className={styles.formItem}>
                                <BulkPrice
                                    getData={() => watch('bulk_price')}
                                    formControl={control}
                                    trigger={trigger}
                                    addRow={addBulkPriceRow}
                                    deleteRow={deleteBulkPriceRow}
                                    deleteAllRows={deleteAllRows}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='catalogSelect'>
                        <FormSection title='Категория' color='COLOR_JAGGED_ICE'>
                            <div className={styles.formItem}>
                                <Controller
                                    control={control}
                                    name="catalogSelect"
                                    render={( { field: { onChange, value } }) => (
                                        <Select
                                            label='Название каталога'
                                            data={value}
                                            updateData={(newValue: ISelectData[]) => {
                                                onChange(newValue)
                                                updateCategorySelect(newValue)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <div className={styles.formItem}>
                                <Controller
                                    control={control}
                                    name="categorySelect"
                                    render={( { field: { onChange, value } }) => (
                                        <Select
                                            label='Название категории'
                                            data={value}
                                            updateData={onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='image'>
                        <FormSection title='Изображение' color='COLOR_BLUE_CHALK'>
                            <div className={styles.formItem}>
                                <Controller
                                    control={control}
                                    name="image"
                                    render={( { field: { onChange, value } } ) => (
                                        <InputImage
                                            label='Название категории'
                                            image={value}
                                            changeHandler={onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='availability'>
                        <FormSection title='Наличие' color='COLOR_WATER_LEAF'>
                            <div className={styles.formItem}>
                                <Controller
                                    control={control}
                                    name="availability"
                                    defaultValue={true}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Switch
                                            label={{
                                                positive: 'Есть в наличии',
                                                negative: 'Нет в наличии'
                                            }}
                                            isActive={value}
                                            toggleActive={() => onChange(!value)}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </div>
                    <div className={styles.formSection} id='visibility'>
                        <FormSection title='Видимость' color='COLOR_WAX_FLOWER'>
                            <div className={styles.formItem}>
                                <Controller
                                    control={control}
                                    name="visibility"
                                    defaultValue={true}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Switch
                                            label={{
                                                positive: 'Показ включен',
                                                negative: 'Показ выключен'
                                            }}
                                            isActive={value}
                                            toggleActive={() => onChange(!value)}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </div>
                </div>
                <div className={styles.formCol}>
                    <ProductPreview
                        data={productPreviewConfig}
                    />
                </div>
            </div>
            <div className={styles.formController}>
                <FormController
                    resetChanges={() => reset()}
                    applyChanges={handleSubmit(submitForm)}
                    isDisabledSubmitButton={
                        type === 'create' ? !isValid : (
                            (!isValid && isSomeFieldUpdated) || (isValid && !isSomeFieldUpdated)
                        )
                    }
                    labels={{
                        applyLabel: type === 'create' ? 'Добавить' : 'Обновить'
                    }}
                />
            </div>
            <div className={`${styles.alert} ${alert.isActive ? styles.active : ''}`}>
                <Alert type={alert.type} textContent={alert.textContent} />
            </div>
            <div className={`${isUpdating ? styles.loader : styles.loaderHidden}`}><Loader isFormLoader /></div>
        </div>
    )
}

export default ProductForm;