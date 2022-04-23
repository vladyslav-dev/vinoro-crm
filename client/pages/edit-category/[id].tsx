import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import styles from '@/styles/pages/form.module.scss';
import Section from '@/layouts/Section';
import useSWR from 'swr'
import CatalogService from '@/services/CatalogService';
import CategoryService from '@/services/CategoryService';
import CategoryForm from '@/components/CategoryForm';

const EditCategory: NextPage = () => {

    const { query } = useRouter();

    const catalogResponse = useSWR('CATALOG-GET-ALL', async () => await CatalogService.getAll())
    const categoryResponse = useSWR(`CATEGORY-GET-ONE-${query.id}`, async () => await CategoryService.getOne(query.id as string))


    const catalogList = catalogResponse.data;
    const category = categoryResponse.data;

    console.log(category)


    if (!catalogList || !category) {
        return null
    }

    return (
        <Section title={category.category_name.ru}>
            <div className={styles.sectionContainer}>
                <CategoryForm
                    catalog={catalogList}
                    category={category}
                    type="update"
                />
            </div>
        </Section>
    )
}

export default EditCategory;
