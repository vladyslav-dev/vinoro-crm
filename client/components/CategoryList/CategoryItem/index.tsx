import { ICategory } from '@/interfaces/category';
import React from 'react';
import styles from './CategoryItem.module.scss';
import { EditIcon } from '@/components/Icons/EditIcon';
import Link from 'next/link';

interface CategoryItemProps {
    category: ICategory;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
    return (
        <Link href={`/category/[id]`} as={`/category/${category?.id}`} passHref>
            <span className={styles.categoryItem}>
                <span className={`${styles.categoryItemName} ${!category.visibility ? styles.hide : ''}`}>
                    {category.category_name.ru}
                </span>
                <Link href={`/edit-category/[id]`} as={`/edit-category/${category?.id}`}>
                    <a className={styles.categoryItemIcon}>
                        <EditIcon color={'#70767D'} />
                    </a>
                </Link>
            </span>
        </Link>
    )
}

export default CategoryItem;