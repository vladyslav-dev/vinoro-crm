import React from 'react';
import InputPrice from '@/components/UI/InputPrice';

interface ProductPriceProps {
    value?: string;
    name?: string;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const ProductPrice: React.FC<ProductPriceProps> = (props) => {
    return (
        <InputPrice {...props} />
    )
}

export default ProductPrice;