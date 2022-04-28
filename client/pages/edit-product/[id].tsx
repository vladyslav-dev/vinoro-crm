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
import Head from 'next/head';

const EditProduct: NextPage = () => {

    const router = useRouter();

    const { data: catalogList } = useSWR('CATALOG-GET-ALL', async () => await CatalogService.getAll())
    const { data: categoryList } = useSWR('CATEGORY-GET-ALL', async () => await CategoryService.getAll())
    const { data: product, error } = useSWR(`PRODUCT-GET-ONE-${router.query.id}`, async () => await ProductService.getOne(router.query.id as string))

    if (!!error) {
        router.push('/')
        return null
    }

    if (!catalogList || !categoryList || !product) {
        return null
    }

    return (
        <>
            <Head>
                <title>Vinoro — {product.name.ru}</title>
            </Head>
            <Section title={product.name.ru}>
                <div className={styles.sectionContainer}>
                    <ProductForm
                        catalog={catalogList}
                        category={categoryList}
                        product={product}
                        type='update'
                    />
                </div>
            </Section>
        </>
    )
}

export default EditProduct;
