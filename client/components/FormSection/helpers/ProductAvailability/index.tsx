import React from 'react';
import Switch from '@/components/UI/Switch';

interface ProductAvailabilityProps {
    label?: {
        positive: string;
        negative: string;
    }
}

const ProductAvailability: React.FC<ProductAvailabilityProps> = (props) => {
    return (
        <Switch {...props} />
    )
}

export default ProductAvailability;