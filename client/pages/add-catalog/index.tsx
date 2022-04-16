import React from 'react';
import styles from '@/styles/pages/form.module.scss';
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import CatalogForm from '@/components/CatalogForm';

const AddCatalog: NextPage = () => {

    return (
        <Section title="Добавить каталог">
            <div className={styles.sectionContainer}>
                <CatalogForm />
            </div>
        </Section>
    )
}

export default AddCatalog;
