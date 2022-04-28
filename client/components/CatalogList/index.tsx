import styles from './Catalog.module.scss';
import React from 'react';
import { ICatalog } from '@/interfaces/catalog';
import { ICategory } from '@/interfaces/category';
import CatalogItem from './CatalogItem';

interface CatalogProps {
    catalogList: ICatalog[];
    categoryList: ICategory[];
}

const CatalogList: React.FC<CatalogProps> = ({ catalogList, categoryList }) => {

    const filterCategoryById = (data: ICategory[], catalogId: string) => {
        return data.filter(item => item.catalog === catalogId)
    }

    return (
        <div className={styles.ctalogWrapper}>
            <ul className={styles.catalogList}>
                {catalogList.map(item => (
                    <li key={item.id} className={styles.catalogItem}>
                        <CatalogItem catalog={item} categoryList={filterCategoryById(categoryList, item.id)} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CatalogList