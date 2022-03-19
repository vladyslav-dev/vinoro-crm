import React from 'react';
import styles from './InputText.module.scss';

type InputType = 'text' | 'password' | 'number';

interface InputTextProps {
    value?: string;
    name?: string;
    changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    authStyleType?: boolean;
    type?: InputType;
    classNames?: string;
}

const InputText: React.FC<InputTextProps> = ({
    value,
    name,
    changeHandler,
    label = 'Default label',
    authStyleType = false,
    type = 'text',
    classNames
}) => {

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder=' '
                onChange={changeHandler}
                className={`${authStyleType ? styles.inputAuth : ''} ${classNames}`}
            />
        </div>
    )
}

export default InputText;