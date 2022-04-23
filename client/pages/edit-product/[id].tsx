import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import ProductForm from '@/components/ProductForm';
import useSWR from 'swr'
import CatalogService from '@/services/CatalogService';
import CategoryService from '@/services/CategoryService';
import ProductService from '@/services/ProductService';

const EditProduct: NextPage = () => {

    const { query } = useRouter();

    const catalogResponse = useSWR('CATALOG-GET-ALL', async () => await CatalogService.getAll())
    const categoryResponse = useSWR('CATEGORY-GET-ALL', async () => await CategoryService.getAll())
    const productResponse = useSWR(`PRODUCT-GET-ONE-${query.id}`, async () => await ProductService.getOne(query.id as string))

    const catalog = catalogResponse.data;
    const category = categoryResponse.data;
    const product = productResponse.data;

    if (!catalog || !category || !product) {
        return null
    }

    return (
        <Section title={product.name.ru}>
            <div className={styles.sectionContainer}>
                <ProductForm
                    catalog={catalog}
                    category={category}
                    product={product}
                    type='update'
                />
            </div>
        </Section>
    )
}

export default EditProduct;
