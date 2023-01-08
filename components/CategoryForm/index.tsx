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
import { ICatalog } from '@/interfaces/catalog';
import { ICategory, ICategoryForm } from '@/interfaces/category';
import Alert from '../Alert';
import { AlertState } from '@/interfaces/alert';
import { useRouter } from 'next/router';
import Loader from '../UI/Loader';
import { initCategoryForm } from '@/utils/form';
import { categoryValidationSchema } from '@/utils/validation';
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

    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [alert, setAlert] = useState<AlertState>({
        isActive: false,
        type: 'success',
        textContent: ''
    });

    const [formState, setFormState] = useState<ICategoryForm>(() => initCategoryForm(catalog, category))

    const { register, control, handleSubmit, watch, reset, formState: { isValid, isDirty } } = useForm<ICategoryForm>({
        mode: 'onChange',
        defaultValues: formState,
        resolver: yupResolver(categoryValidationSchema)
    });

    const onSubmit = async (data: ICategoryForm) => {

        // set Loading background
        setIsUpdating(true)

        const selectedCatalog = data?.catalogSelect?.find(item => item.selected);

        const fetchData: any = {
            category_name: data.category_name,
            category_image: data.category_image,
            visibility: data.visibility ?? true,
            catalog: selectedCatalog?.id!
        }

        type === 'update' && (fetchData['id'] = data!.id) // add key id if form type update

        // slow transition to show Loader
        setTimeout(() => {
            if (type === 'create') {
                CategoryService.create(fetchData)
                    .then(category => {

                         // remove Loading background
                        setIsUpdating(false)

                        // show alert success
                        setAlert({
                            isActive: true,
                            type: 'success',
                            textContent: 'Категория успешно создана'
                        })

                        // redirect to edit page after 2500ms
                        setTimeout(() => {
                            router.push(`/edit-category/${category.id}`)
                        }, 2500)
                    })
                    .catch(err => {
                        // remove Loading background
                        setIsUpdating(false)

                        // set Error alert
                        setAlert({
                            isActive: true,
                            type: 'error',
                            textContent: 'Ошибка при создании'
                        })

                         // remove Alert after 2500ms
                        setTimeout(() => {
                            setAlert((prevState => ({
                                ...prevState,
                                isActive: false,
                            })))
                        }, 2500)

                        // reset form to default
                        reset();
                    })

            }

            if (type === 'update') {
                CategoryService.update(fetchData)
                    .then((updatedCategory: ICategory) => {

                        // Calculate new initial value
                        const newInitValue = initCategoryForm(catalog, updatedCategory)

                        // set new value
                        setFormState(() => newInitValue)
                        // reset form with new value
                        reset(newInitValue)

                        // show alert "success updated"
                        setAlert({
                            isActive: true,
                            type: 'success',
                            textContent: 'Категория успешно обновлена'
                        })
                    })
                    .catch(err => {

                        // remove Loading background
                        setIsUpdating(false)

                        // show alert "error on updating"
                        setAlert({
                            isActive: true,
                            type: 'error',
                            textContent: 'Ошибка при обновлении'
                        })
                    })
                    .finally(() => {

                        // remove Loading background
                        setIsUpdating(false)

                        // remove Alert after 2500ms
                        setTimeout(() => {
                            setAlert((prevState => ({
                                ...prevState,
                                isActive: false,
                            })))
                        }, 2500)
                    })
            }
        }, 820)
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
                    {/* <div className={styles.formItem}>
                        <InputText
                            label='Название — RU'
                            registerPath='category_name.ru'
                            register={register}
                        />
                    </div> */}
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
                    isDisabledSubmitButton={!isValid || !isDirty}
                    labels={{
                        applyLabel: type === 'create' ? 'Добавить' : 'Обновить'
                    }}
                />
            </div>
            <div className={`${styles.alert} ${alert.isActive ? styles.active : ''}`}>
                <Alert type={alert.type} textContent={alert.textContent} />
            </div>
            <div className={`${isUpdating ? styles.loader : styles.loaderHidden}`}><Loader type='bubbles' /></div>
        </div>
    )
}

export default CategoryForm;