/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import formStyles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import useSWR from 'swr'
import CategoryService from '@/services/CategoryService';
import EmptyList from '@/components/EmptyList';
import ProductService from '@/services/ProductService';
import CardListDraggable from '@/components/CardListDraggable';

const Category: NextPage = () => {

    const { query } = useRouter();

    const { data: category } = useSWR(`CATEGORY-GET-ONE-${query.id}`, async () => {
        return await CategoryService.getOne(query.id as string)
    })
    const { data: products } = useSWR(`GET-PRODUCTS-BY-CATEGORY-${query.id}`, async () => {
        return await ProductService.getByCategoryId(query.id as string)
    })

    if (!category || !products) {
        return null
    }

    return (
        <Section title={category.category_name.ru} toolbar showBackground={false}>
            <div className={formStyles.sectionContainer}>
                {products.length ? (
                    <CardListDraggable products={products} />
                ): (
                    <EmptyList />
                )}
            </div>
        </Section>
    )
}

export default Category;
