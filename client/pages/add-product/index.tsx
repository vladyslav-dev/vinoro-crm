import React from 'react';
import { NextPage } from 'next';
import styles from '@/styles/pages/add-product.module.scss';
import Section from '@/layouts/Section';
import Form from '@/components/Form';

const AddProduct: NextPage = () => {

    return (
        <Section title="Добавить товар">
            <div className={styles.sectionContainer}>
                <Form />
            </div>
        </Section>
    )
}

export default AddProduct;
