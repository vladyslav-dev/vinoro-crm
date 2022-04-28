import React from 'react';
import useSWR from 'swr'
import CatalogService from '@/services/CatalogService';
import CategoryService from '@/services/CategoryService';
import Head from 'next/head';

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
        <>
            <Head>
                <title>Vinoro — Каталог</title>
            </Head>
            <Section title="Каталог" showBackground={false}>
                <CatalogList catalogList={catalog} categoryList={category} />
            </Section>
        </>

    )
}

export default Catalog

