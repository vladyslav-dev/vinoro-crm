import React from 'react';
import { NextPage } from 'next';
import ProductService from '@/services/ProductService';
import useSWR from 'swr';
import styles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import CardList from '@/components/CardList';
import EmptyList from '@/components/EmptyList';
import Loader from '@/components/UI/Loader';
import Head from 'next/head';

const Products: NextPage = () => {

    const { data: products } = useSWR(`PRODUCTS-GET-ALL`, async () => await ProductService.getAll());

    return (
        <>
            <Head>
                <title>Vinoro — Все товары</title>
            </Head>
            <Section title={'Все товары'} toolbar showBackground={!!products?.length}>
                <div className={styles.sectionContainer}>
                    {!products ? (
                        <Loader type='bubbles' />
                    ) : (
                        <>
                            {products.length ? (
                                <CardList products={products} />
                            ) : (
                                <EmptyList />
                            )}
                        </>
                    )}
                </div>
            </Section>
        </>
    )
}

export default Products
