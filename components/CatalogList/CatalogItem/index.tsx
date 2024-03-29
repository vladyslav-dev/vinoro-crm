import React from 'react';
import styles from './CatalogItem.module.scss';
import { ICatalog } from '@/interfaces/catalog';
import { ICategory } from '@/interfaces/category';
import CategoryList from '@/components/CategoryList';
interface CatalogProps {
    catalog: ICatalog;
    categoryList: ICategory[];
}

const CatalogItem: React.FC<CatalogProps> = ({ catalog, categoryList }) => (
    <div className={styles.catalogItem} id={String(catalog.catalog_name.en).replaceAll(' ', '-')}>
        <div className={styles.catalogName}>
            <h4>{catalog.catalog_name.uk}</h4>
        </div>
        <div className={styles.categoryList}>
            <CategoryList categoryList={categoryList} />
        </div>
    </div>
)

export default CatalogItem