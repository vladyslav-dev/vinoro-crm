import React from 'react';
import useSWR from 'swr'
import styles from '@/styles/pages/form.module.scss';
import CatalogService from '@/services/CatalogService';
import CategoryService from '@/services/CategoryService';

import { NextPage } from 'next';
import CatalogList from '@/components/CatalogList';
import Section from '@/layouts/Section';

const Catalog: NextPage = () => {

    const catalogResponse = useSWR('CATALOG-GET-ALL', async () => await CatalogService.getAll());
    const categoryResponse = useSWR('CATEGORY-GET-ALL', async () => await CategoryService.getAll());


    const catalog = catalogResponse.data;
    const category = categoryResponse.data;

    if (!catalog || !category) {
        return null
    }

    return (
        <Section title="Каталог">
            <div className={styles.sectionContainer}>
                <CatalogList catalogList={catalog} categoryList={category} />
            </div>
        </Section>
    )
}

export default Catalog

