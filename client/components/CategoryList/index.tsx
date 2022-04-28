import React from 'react';
import { ICategory } from '@/interfaces/category';
import CategoryItem from './CategoryItem';

interface CategoryListProps {
    categoryList: ICategory[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categoryList }) => {
    return (
        <ul>
            {categoryList.map(item => (
                <li key={item.id}>
                    <CategoryItem category={item} />
                </li>
            ))}
        </ul>
    )
}

export default CategoryList