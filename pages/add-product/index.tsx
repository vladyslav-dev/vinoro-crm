import React from 'react';
import { NextPage } from 'next';
import styles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import ProductForm from '@/components/ProductForm';
import useSWR from 'swr'
import CatalogService from '@/services/CatalogService';
import CategoryService from '@/services/CategoryService';
import Head from 'next/head';

const AddProduct: NextPage = () => {

    const catalogResponse = useSWR('CATALOG-GET-ALL', async () => await CatalogService.getAll())
    const categoryResponse = useSWR('CATEGORY-GET-ALL', async () => await CategoryService.getAll())

    const catalog = catalogResponse.data;
    const category = categoryResponse.data;

    if (!catalog || !category) {
        return null
    }

    return (
        <>
            <Head>
                <title>Vinoro — Добавить товар</title>
            </Head>
            <Section title="Добавить товар">
                <div className={styles.sectionContainer}>
                    <ProductForm
                        catalog={catalog}
                        category={category}
                        type='create'
                    />
                </div>
            </Section>
        </>
    )
}

export default AddProduct;
