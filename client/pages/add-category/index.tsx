import React from 'react';
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import styles from '@/styles/pages/form.module.scss';
import CategoryForm from '@/components/CategoryForm';
import CatalogService from '@/services/CatalogService';
import useSWR from 'swr'
import Head from 'next/head';


const AddCategory: NextPage = () => {

    const { data } = useSWR(`CATALOG-GET-ALL`, async () => await CatalogService.getAll())

    if (!data) {
        return null
    }

    return (
        <>
            <Head>
                <title>Vinoro — Добавить категорию</title>
            </Head>
            <Section title="Добавить категорию">
                <div className={styles.sectionContainer}>
                    <CategoryForm
                        catalog={data}
                        type="create"
                    />
                </div>
            </Section>
        </>

    )
}

export default AddCategory;
