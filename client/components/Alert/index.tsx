/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './Alert.module.scss';
import successIcon from '@/images/success-icon.svg';
import errorIcon from '@/images/error-icon.svg';
import { AlertProps } from '@/interfaces/alert';

const Alert: React.FC<AlertProps> = ({
    type,
    textContent
}) => {

    const isSuccess = type === 'success';
    const isError = type === 'error';
    console.log(successIcon)
    return (
        <div
            className={`
            ${styles.alert}
            ${isSuccess ? styles.success : ''}
            ${isError ? styles.error : ''}
            `}
        >
            <span className={styles.alertIcon}>
                <img src={isSuccess ? successIcon.src : errorIcon.src} alt='icon' />
            </span>
            <span className={styles.alertText}>{textContent}</span>
        </div>
    )
}

export default Alert;