import React, { useEffect, useState } from 'react';
import styles from './CatalogForm.module.scss';
import FormSection from '@/components/FormSection';
import FormController from '@/components/FormController';
import InputText from '../UI/InputText';
import Switch from '@/components/UI/Switch';
import { ICatalog, ICatalogData } from '@/interfaces/catalog';
import CatalogService from '@/services/CatalogService';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { catalogValidationSchema } from '@/utils/validation';

interface CatalogFormProps {
    catalogData?: ICatalog
}

const CatalogForm: React.FC<CatalogFormProps> = ({ catalogData }) => {
    console.log('catalog form render');

    const { register, control, handleSubmit, reset, formState: { isValid } } = useForm<ICatalogData>({
        mode: 'onChange',
        defaultValues: {
            catalog_name: {
                ru: catalogData?.catalog_name.ru || '',
                uk: catalogData?.catalog_name.uk || '',
                en: catalogData?.catalog_name.en || '',
            },
            catalog_image: catalogData?.catalog_image || '',
            visibility: catalogData?.visibility || true
        },
       resolver: yupResolver(catalogValidationSchema)
    });

    const onSubmit = async (data: ICatalogData) => {
        console.log(data);
        const response = await CatalogService.createCatalog(data);
        console.log(response);
        reset();
    };

    const resetForm = () => reset();

    return (
        <div className={styles.form}>
            <div className={styles.formSection}>
                <FormSection title='Название' color='COLOR_JORDY_BLUE'>
                    <div className={styles.formItem}>
                        <InputText
                            label='Название — RU'
                            registerPath='catalog_name.ru'
                            register={register}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <InputText
                            label='Название — UK'
                            registerPath='catalog_name.uk'
                            register={register}
                        />
                    </div>
                    <div className={styles.formItem}>
                        <InputText
                            label='Название — EN'
                            registerPath='catalog_name.en'
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
            <div className={styles.formController}>
                <FormController
                    resetChanges={resetForm}
                    applyChanges={handleSubmit(onSubmit)}
                    isDisabledSubmitButton={!isValid}
                    labels={{
                        applyLabel: 'Добавить'
                    }}
                />
            </div>
        </div>
    )
}

export default CatalogForm;