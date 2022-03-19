import React from 'react';
import InputText from '@/components/UI/InputText';

interface ProductNameProps {
    value?: string;
    name?: string;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const ProductName: React.FC<ProductNameProps> = (props) => {
    return (
        <InputText {...props} />
    )
}

export default ProductName;