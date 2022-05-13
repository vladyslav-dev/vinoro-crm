import React, { ChangeEvent } from 'react';
import styles from './InputPrice.module.scss';

interface InputPriceProps {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    showCurrency?: boolean;
}

const InputPrice: React.FC<InputPriceProps> = ({
    label,
    value,
    onChange,
    showCurrency = true
}) => {

    const changeHandler = (e: ChangeEvent) => {
        const { value } = e.target as HTMLInputElement;
        const pattern = /^\d*$/.test(value);
        return pattern && (value === "" || parseInt(value)) && onChange(value)
    }

    return (
        <div className={`${styles.inputWrapper} ${showCurrency ? styles.currency : ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                type='text'
                placeholder=' '
                className={styles.input}
                value={value}
                onChange={changeHandler}

            />
        </div>
    )
}

export default InputPrice;