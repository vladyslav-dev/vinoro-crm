import React from 'react';
import { NextPage } from 'next';
import ProductService from '@/services/ProductService';
import useSWR from 'swr';
import styles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import CardList from '@/components/CardList';

const Products: NextPage = () => {

    const productResponse = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/product`, async () => await ProductService.getAll())


    const products = productResponse.data;
    console.log(products)
    if (!products) {
        return <h1>Loading...</h1>
    }

    //console.log(JSON.stringify(products, null, 2) )

    return (
        <Section title={'Все товары'}>
            <div className={styles.sectionContainer}>
                <CardList products={products} />
            </div>
        </Section>
    )
}

export default Products
