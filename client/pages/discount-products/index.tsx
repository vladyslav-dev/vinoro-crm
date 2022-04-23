import React from 'react'
import { NextPage } from 'next';
import formStyles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import useSWR from 'swr'

import CardList from '@/components/CardList';
import EmptyList from '@/components/EmptyList';
import ProductService from '@/services/ProductService';


const DiscountProducts: NextPage = () => {

    const discountedProducts = useSWR(`GET-DISCOUNTED-PRODUCTS`, async () => await ProductService.getDiscountedProducts())

    const products = discountedProducts.data;

    console.log(products)

    if (!products) {
        return null
    }

    return (
        <Section title={'Товары со скидкой'} toolbar showBackground={false}>
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

export default DiscountProducts;
