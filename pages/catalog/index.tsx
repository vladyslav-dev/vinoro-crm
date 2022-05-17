import React from 'react';
import useSWR from 'swr'
import CatalogService from '@/services/CatalogService';
import CategoryService from '@/services/CategoryService';
import Head from 'next/head';

import { NextPage } from 'next';
import CatalogList from '@/components/CatalogList';
import Section from '@/layouts/Section';
import Loader from '@/components/UI/Loader';

const Catalog: NextPage = () => {

    const { data: catalog } = useSWR('CATALOG-GET-ALL', async () => await CatalogService.getAll());
    const { data: category } = useSWR('CATEGORY-GET-ALL', async () => await CategoryService.getAll());

    return (
        <>
            <Head>
                <title>Vinoro — Каталог</title>
            </Head>
            <Section title="Каталог" showBackground={false}>
                {!catalog || !category ? (
                    <Loader type='bubbles' />
                ) : (
                    <CatalogList catalogList={catalog} categoryList={category} />
                )}
            </Section>
        </>
    )
}

export default Catalog

