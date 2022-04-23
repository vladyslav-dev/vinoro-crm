import React from 'react'
import { NextPage } from 'next';
import formStyles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import useSWR from 'swr'

import CardList from '@/components/CardList';
import EmptyList from '@/components/EmptyList';
import ProductService from '@/services/ProductService';


const NewProducts: NextPage = () => {

    const newProducts = useSWR(`GET-NEW-PRODUCTS`, async () => await ProductService.getNewProducts())

    const products = newProducts.data;

    if (!products) {
        return null
    }

    return (
        <Section title={'Новые товары'} toolbar showBackground={false}>
            <div className={formStyles.sectionContainer}>
                {products.length ? (
                    <CardList products={products} />
                ) : (
                    <EmptyList />
                )}
            </div>
        </Section>
    )
}

export default NewProducts;
