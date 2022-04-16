import React, { useState } from 'react';
import styles from './CategoryForm.module.scss';
import FormSection from '@/components/FormSection';
import FormController from '@/components/FormController';
import InputText from '../UI/InputText';
import Switch from '@/components/UI/Switch';
import Select from '@/components/UI/Select';
import CategoryService from '@/services/CategoryService';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ICatalog } from '@/interfaces/catalog';
import { ICategory, ICategoryData } from '@/interfaces/category';
import { ISelectData } from '@/components/UI/Select';
import Alert from '../Alert';
import { AlertState } from '@/interfaces/alert';
import { useRouter } from 'next/router';
import Loader from '../Loader';

const validationSchema = yup.object().shape({
    category_name: yup.object().shape({
        ru: yup.string().required(),
        uk: yup.string().required(),
        en: yup.string().required(),
    })
  });

interface ICategoryForm extends Omit<ICategoryData, 'catalog'> {
    catalogSelect: ISelectData[]
}

interface CategoryFormProps {
    catalog: ICatalog[];
    category?: ICategory;
    type: 'update' | 'create'
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    catalog,
    category,
    type
}) => {
    console.log('category form render');
    console.log(catalog)

    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertState>({
        isActive: false,
        type: 'success',
        textContent: ''
    });

    const catalogSelectData: ISelectData[] = catalog!.map((item, index) => ({
        id: item.id,
        value: item.catalog_name.ru,
        selected: !!(index === 0)
    }))

    const { register, control, handleSubmit, reset, formState: { isValid } } = useForm<ICategoryForm>({
        mode: 'onChange',
        defaultValues: {
            category_name: {
                ru: category?.category_name.ru || '',
                uk: category?.category_name.uk || '',
                en: category?.category_name.en || '',
            },
            category_image: category?.category_image || '',
            visibility: category?.visibility || true,
            catalogSelect: catalogSelectData
        },
      resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data: ICategoryForm) => {
        const selectedCatalog = data?.catalogSelect?.find(item => item.selected);

        const fetchData: any = {
            category_name: data.category_name,
            category_image: data.category_image,
            visibility: data.visibility,
            catalog: selectedCatalog?.id!
        }

        type === 'update' && (fetchData['id'] = data!.id) // add key id if form type update

        if (type === 'create') {
            CategoryService.create(fetchData)
                .then(category => {
                    setIsUpdating(false)

                    setAlert({
                        isActive: true,
                        type: 'success',
                        textContent: 'Категория успешно создана'
                    })

                    setTimeout(() => {
                        router.push(`/edit-category/${category.id}`)
                    }, 2500)
                })
                .catch(err => {
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
            CategoryService.update(fetchData)
        }

        reset();
    };

    const resetForm = () => reset();

    return (
        <div className={`${styles.form} ${isUpdating ? styles.updating : ''}`}>
            <div className={styles.formSection}>
                <FormSection title='Каталог' color='COLOR_JORDY_BLUE'>
                    <div className={styles.formItem}>
                       <Controller
                            control={control}
                            name="catalogSelect"
                            render={( { field: { onChange, value } }) => (
                                <Select
                                    label='Название'
                                    data={value}
                                    updateData={onChange}
                                />
                            )}
                        />
                    </div>
                </FormSection>
            </div>
            <div className={styles.formSection}>
                <FormSection title='Категория' color='COLOR_JORDY_BLUE'>
                    <div className={styles.formItem}>
                        <InputText
                            label='Название — RU'
                            registerPath='category_name.ru'
                            register={register}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <InputText
                            label='Название — UK'
                            registerPath='category_name.uk'
                            register={register}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <InputText
                            label='Название — EN'
                            registerPath='category_name.en'
                            register={register}
                        />
                    </div>
                </FormSection>
            </div>
            <div className={styles.formSection}>
                <FormSection title='Видимость' color='COLOR_JORDY_BLUE'>
                    <div className={styles.formItem}>
                        <Controller
                            control={control}
                            name="visibility"
                            defaultValue={true}
                            render={({ field: { onChange, value } }) => (
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
            <div className={styles.formController}>
                <FormController
                    resetChanges={resetForm}
                    applyChanges={handleSubmit(onSubmit)}
                    isDisabledSubmitButton={!isValid}
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

export default CategoryForm;