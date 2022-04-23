import React from 'react';
import { NextPage } from 'next';
import Section from '@/layouts/Section';
import styles from '@/styles/pages/form.module.scss';
import CategoryForm from '@/components/CategoryForm';
import CatalogService from '@/services/CatalogService';
import { ICatalog } from '@/interfaces/catalog';
import useSWR from 'swr'


const AddCategory: NextPage = () => {

    const { data } = useSWR(`CATALOG-GET-ALL`, async () => await CatalogService.getAll())
    console.log(data)


    if (!data) {
        return null
    }

    return (
        <Section title="Добавить категорию">
            <div className={styles.sectionContainer}>
                <CategoryForm
                    catalog={data}
                    type="create"
                />
            </div>
        </Section>
    )
}

export default AddCategory;
