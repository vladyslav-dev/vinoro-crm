import React from 'react';
import styles from './Button.module.scss';
import { ButtonType, ButtonVariant, ButtonColorStyle } from '@/interfaces/button';
import { getButtonStyle } from '@/utils/button';

interface ButtonProps {
    innerText?: string;
    type?: ButtonType;
    classNames?: string;
    variant?: ButtonVariant;
    color?: ButtonColorStyle;
    clickHandler?: (event: React.SyntheticEvent) => void;
}

const Button: React.FC<ButtonProps> = ({
    innerText = 'Default text',
    type = 'button',
    classNames,
    variant = 'default',
    color,
    clickHandler,
}) => (
    <button
        className={`${classNames} ${styles.button}`}
        type={type}
        style={getButtonStyle(color!)[variant] as React.CSSProperties}
        onClick={clickHandler}
    >
        {innerText}
    </button>
)

export default Button;