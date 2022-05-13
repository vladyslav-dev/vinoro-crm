import React from 'react'
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import useSWR from 'swr'
import Head from 'next/head';
import CardList from '@/components/CardList';
import EmptyList from '@/components/EmptyList';
import ProductService from '@/services/ProductService';
import Loader from '@/components/UI/Loader';


const NewProducts: NextPage = () => {

    const { data: products } = useSWR(`GET-NEW-PRODUCTS`, async () => await ProductService.getNewProducts())

    return (
        <>
            <Head>
                <title>Vinoro — Новые товары</title>
            </Head>
            <Section title={'Новые товары'} toolbar showBackground={!!products?.length}>
                {!products ? (
                    <Loader type='bubbles' />
                ) : (
                    <>
                        {products.length ? (
                            <CardList products={products} />
                        ) : (
                            <EmptyList text='Видимо новых товаров еще не завезли' />
                        )}
                    </>
                )}
            </Section>
        </>
    )
}

export default NewProducts;
