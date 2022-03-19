import React from 'react';
import Textarea from '@/components/UI/Textarea';

interface ProductNameProps {
    value?: string;
    name?: string;
    label?: string;
    changeHandler?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProductName: React.FC<ProductNameProps> = (props) => {
    return (
        <Textarea {...props} />
    )
}

export default ProductName;