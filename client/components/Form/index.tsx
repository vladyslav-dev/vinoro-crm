import React from 'react';
import styles from './Form.module.scss';
import FormSection from '@/components/FormSection';
import ProductName from '@/components/FormSection/helpers/ProductName';
import ProductPrice from '@/components/FormSection/helpers/ProductPrice';
import ProductDescription from '@/components/FormSection/helpers/ProductDescription';
import ProductAvailability from '@/components/FormSection/helpers/ProductAvailability';
import ProductCategory from '@/components/FormSection/helpers/ProductCategory';

interface FormProps {

}

const Form: React.FC<FormProps> = ({}) => {
    return (
        <div className={styles.form}>
            <div className={styles.formCol}>
                <div className={styles.formSection}>
                    <FormSection title='Название' color='COLOR_JORDY_BLUE'>
                        <div className={styles.formItem}>
                            <ProductName
                                label='Название — RU'
                            />
                        </div>
                        <div className={styles.formItem}>
                            <ProductName
                                label='Название — UK'
                            />
                        </div>
                        <div className={styles.formItem}>
                            <ProductName
                                label='Название — EN'
                            />
                        </div>
                    </FormSection>
                </div>
                <div className={styles.formSection}>
                    <FormSection title='Описание' color='COLOR_JORDY_BLUE'>
                        <div className={styles.formItem}>
                            <ProductDescription
                                label='Описание — RU'
                            />
                        </div>
                        <div className={styles.formItem}>
                            <ProductDescription
                                label='Описание — UK'
                            />
                        </div>
                        <div className={styles.formItem}>
                            <ProductDescription
                                label='Описание — EN'
                            />
                        </div>
                    </FormSection>
                </div>
                <div className={styles.formSection}>
                    <FormSection title='Цена' color='COLOR_JORDY_BLUE'>
                        <div className={styles.formItem}>
                            <ProductPrice
                                label='Стоимость'
                            />
                        </div>
                    </FormSection>
                </div>
                <div className={styles.formSection}>
                    <FormSection title='Наличие' color='COLOR_JORDY_BLUE'>
                        <div className={styles.formItem}>
                            <ProductAvailability
                                label={{
                                    positive: 'Есть в наличии',
                                    negative: 'Нет в наличии'
                                }}
                            />
                        </div>
                    </FormSection>
                </div>
                <div className={styles.formSection}>
                    <FormSection title='Категория' color='COLOR_JORDY_BLUE'>
                        <div className={styles.formItem}>
                            <ProductCategory
                                label='Каталог'
                            />
                        </div>
                    </FormSection>
                </div>
            </div>
            <div className={styles.formCol}>
                <div className={styles.formSection}>
                    <FormSection title='Категория' color='COLOR_JORDY_BLUE'>
                        <div className={styles.formItem}>
                            <ProductCategory
                                label='Каталог'
                            />
                        </div>
                    </FormSection>
                </div>
            </div>
        </div>
    )
}

export default Form;