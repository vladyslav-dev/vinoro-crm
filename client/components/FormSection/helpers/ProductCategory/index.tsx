import React from 'react';
import Select from '@/components/UI/Select';

interface ProductCategoryProps {
    label?: string;
}

const ProductCategory: React.FC<ProductCategoryProps> = (props) => {
    return (
        <Select {...props} />
    )
}

export default ProductCategory;