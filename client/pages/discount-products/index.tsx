import React from 'react'
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import useSWR from 'swr'

import CardList from '@/components/CardList';
import EmptyList from '@/components/EmptyList';
import ProductService from '@/services/ProductService';
import Loader from '@/components/UI/Loader';
import Head from 'next/head';


const DiscountProducts: NextPage = () => {

    const { data: products } = useSWR(`GET-DISCOUNTED-PRODUCTS`, async () => await ProductService.getDiscountedProducts());

    return (
        <>
            <Head>
                <title>Vinoro — Товары со скидкой</title>
            </Head>
            <Section title={'Товары со скидкой'} toolbar showBackground={false}>
                {!products ? (
                    <Loader type='bubbles' />
                ) : (
                    <>
                        {products.length ? (
                            <CardList products={products} />
                        ) : (
                            <EmptyList text={'Похоже тут ничего нет'} />
                        )}
                    </>
                )}
            </Section>
        </>
    )
}

export default DiscountProducts;
