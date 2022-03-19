import React from 'react';
import styles from './InputPrice.module.scss';

interface InputPriceProps {
    value?: string;
    name?: string;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
}

const InputPrice: React.FC<InputPriceProps> = ({
    value,
    name,
    changeHandler,
    label
}) => {

    return (
        <div className={styles.inputWrapper}>
            {label && <label className={styles.label} htmlFor={name}>{label}</label>}
            <input
                id={'myTextField'}
                type='number'
                name={name}
                value={value}
                placeholder=' '
                min={1}
                step="1"
                onChange={changeHandler}
                className={styles.input}
            />
        </div>
    )
}

export default InputPrice;