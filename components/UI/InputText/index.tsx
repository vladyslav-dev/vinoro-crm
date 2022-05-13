import React from 'react';
import styles from './InputText.module.scss';
import { Path, UseFormRegister } from 'react-hook-form';

type InputType = 'text' | 'password' | 'number';

interface InputTextProps {
    label: string;
    registerPath: Path<any>;
    register: UseFormRegister<any>;
    authStyleType?: boolean;
    type?: InputType;
}

const InputText: React.FC<InputTextProps> = ({
    label = 'Default label',
    authStyleType = false,
    type = 'text',
    register,
    registerPath
}) => {

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor={registerPath}>{label}</label>
            <input
                id={registerPath}
                type={type}
                placeholder=' '
                autoComplete="off"
                className={`${authStyleType ? styles.inputAuth : ''}`}
                {...register(registerPath)}
            />
        </div>
    )
}

export default InputText;