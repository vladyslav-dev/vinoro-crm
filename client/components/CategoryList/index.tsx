import styles from './CategoryList.module.scss';
import React from 'react';
import { ICategory } from '@/interfaces/category';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
    categoryList: ICategory[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryList }) => {
    return (
        <ul className={styles.categoryList}>
            {categoryList.map(item => (
                <li key={item.id} className={styles.categoryItem}>
                    <CategoryItem category={item} />
                </li>
            ))}
        </ul>
    )
}

export default CategoryList