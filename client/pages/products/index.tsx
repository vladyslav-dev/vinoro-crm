import React from 'react';
import { NextPage } from 'next';
import ProductService from '@/services/ProductService';
import useSWR from 'swr';
import styles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import CardList from '@/components/CardList';
import EmptyList from '@/components/EmptyList';

const Products: NextPage = () => {

    const productResponse = useSWR(`PRODUCTS-GET-ALL`, async () => await ProductService.getAll())

    const products = productResponse.data;

    if (!products) {
        return <h1>Loading...</h1>
    }

    return (
        <Section title={'Все товары'} toolbar showBackground={false}>
            <div className={styles.sectionContainer}>
                {products.length ? (
                    <CardList products={products} />
                ): (
                    <EmptyList />
                )}
            </div>
        </Section>
    )
}

export default Products
